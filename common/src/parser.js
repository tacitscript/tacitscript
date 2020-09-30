//==========================================================
// functional utilities
const pipe = function () {const args = Array.prototype.slice.call(arguments); return function(value) {return args.reduce(function(acc, fn) {return fn(acc);}, value);}};
const map = function(fn) {return function(array) { return array.map(fn);};};
const reduce = function(reducer) {return function(startingValue) {return function(array) {return array.reduce(reducer, startingValue);};};};
const join = function(delimiter) {return function(array) {return array.join(delimiter);};};
const matches = function(regex) {return function(test) {return (typeof test === "string") && test.match(regex);};};
const filter = function(check) {return function(array) {return array.filter(check);};};
const any = function(check) {return function(array) {return array.some(check);};};
const none = function(check) {return function(array) {return !array.some(check);};};
const last = function(vector) {return vector[vector.length - 1];};
const flatten = reduce(function(acc, value) {return acc.concat(Array.isArray(value) ? flatten(value) : [value]);})([]);
const contains = function(value) {return function(array) {return array.includes(value);};};
const omit = function(keys) {return function(object) {const copy = Object.assign({}, object); keys.forEach(function(key) {delete copy[key];}); return copy;};};
const fromPairs = function(pairs) {return pairs.reduce(function(prev, curr) {prev[curr[0]] = curr[1]; return prev;}, {});};

//==================================================================
// type utilities

const isArray = function(value) {return Array.isArray(value);};
const isObject = function(value) {return (typeof value === 'object') && !isArray(value);};

//==================================================================
// parsing

const parseTrampoline = function(data) {
	const remaining = data.remaining;
	const type = data.type;
	const blocks = data.blocks;
	const blockCommentDepth = data.blockCommentDepth;
	const lineComment = data.lineComment;
	const quotationMark = data.quotationMark;

	if (lineComment) {
		if (remaining[0] !== "\n") return Object.assign({}, data, {remaining: remaining.slice(1)});
		// otherwise, add the newline to the block data, and remove the lineComment
	} else if (blockCommentDepth) {
		if (remaining.startsWith("*/")) return Object.assign({}, data, {remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth - 1});
		else if (remaining.startsWith("/*")) return Object.assign({}, data, {remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth + 1});
		else if (remaining[0] !== "\n") return Object.assign({}, data, {remaining: remaining.slice(1)});
		// otherwise, add the newline to the block data
	} else if (!quotationMark && remaining.startsWith("//")) {
		return Object.assign({}, data, {remaining: remaining.slice(2), lineComment: true});
	} else if ((type === "js") && !quotationMark && (remaining.match(/^\/\*ts\s{1}/))) {
		var data = {
			type: "ts",
			blocks: [],
			remaining: remaining.slice(4),
			blockCommentDepth: 0,
			lineComment: false,
			quotationMark: ""
		};

		while (data.remaining && (data.blockCommentDepth || !data.remaining.startsWith("*/"))) {
			data = parseTrampoline(data);
		}

		return Object.assign({}, data, {
			type: "js",
			blocks: data.blocks.length ? blocks.concat(omit(["remaining", "blockCommentDepth", "lineComment"])(data)) : blocks,
			remaining: data.remaining.slice(2)
		});
	} else if (!quotationMark && remaining.startsWith("/*")) {
		return Object.assign({}, data, {remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth + 1});
	} else if ((type === "ts") && !quotationMark && remaining.startsWith('{"')) {
		var data = {
			type: "js",
			blocks: [],
			remaining: remaining.slice(2),
			blockCommentDepth: 0,
			lineComment: false,
			quotationMark: ""
		};

		while (data.remaining && (data.blockCommentDepth || !data.remaining.startsWith('"'))) {
			data = parseTrampoline(data);
		}

		return Object.assign({}, data, {
			type: "ts",
			blocks: data.blocks.length ? blocks.concat(omit(["remaining", "blockCommentDepth", "lineComment"])(data)) : blocks,
			remaining: data.remaining.slice(1)
		});
	} else if (quotationMark && (remaining[0] === "\\")) {
		return Object.assign({}, data, { // parse two characters
			blocks: blocks.length ? (isObject(last(blocks)) ? blocks.concat(remaining.slice(0, 2)) : blocks.slice(0, -1).concat(last(blocks) + remaining.slice(0, 2))) : [remaining.slice(0, 2)],
			remaining: remaining.slice(2)
		});
	}

	const newQuotationMark = (function() {
		if (quotationMark) return (remaining[0] === quotationMark) ? "" : quotationMark;
		if (blockCommentDepth) return "";

		const validQuotationMarks = (type === "js") ? ['"', "'", "`"] : ['"'];
		const isQuotationMark = validQuotationMarks.includes(remaining[0]);

		return isQuotationMark ? remaining[0] : "";
	})();

	return Object.assign({}, data, {// parse one character
		blocks: blocks.length ? (isObject(last(blocks)) ? blocks.concat([remaining[0]]) : blocks.slice(0, -1).concat(last(blocks) + remaining[0])) : [remaining[0]],
		remaining: remaining.slice(1),
		lineComment: false,
		quotationMark: newQuotationMark
	});
};
const parse = function(remaining) {
	var data = {
		type: "js",
		blocks: [],
		remaining: remaining,
		blockCommentDepth: 0,
		lineComment: false,
		quotationMark: ""
	};

	while (data.remaining) {
		data = parseTrampoline(data);
	}

	return omit(["remaining", "blockCommentDepth", "lineComment"])(data);
};

//==========================================================
// tacitscript conversion code

const applySymbols = function(left, right) {
	// first symbol in evaluation
	if (!left) return right;

	return "ts.apply(" + left + ", " + right + ")";
};
const mergeBlocks = function(details) {return details.blocks.concat(details.currentBlock.length ? [details.currentBlock] : []);};
const processSymbols = function(symbols, acc, userDefinitions) {
	if (Array.isArray(symbols)) {
		return pipe(
			// separate into space delimited blocks
			reduce(function(details, symbol) {
				if ((typeof symbol === "string") && symbol.match(/^\s+$/)) {
					return {currentBlock: [], blocks: mergeBlocks(details)};
				} else {
					return {currentBlock: details.currentBlock.concat([symbol]), blocks: details.blocks};
				}
			})({currentBlock: [], blocks: []}),
			mergeBlocks,
			map(reduce(function(acc, symbol) {return applySymbols(acc, lookup({symbol: symbol, userDefinitions: userDefinitions}));})(undefined)),
			function(terms) {
				// if any spaces, return the array, otherwise, return terms[0];
				return any(matches(/^\s+$/))(symbols) ? stringify(map(stringify)(terms)) : stringify(terms[0]);
			}
		)(symbols);
	} else {
		return applySymbols(acc, lookup({symbol: symbols, userDefinitions: userDefinitions}));
	}
};
const deprioritizeMedialDots = function(symbols) {
	const data = reduce(function(details, symbol) {
		if (Array.isArray(symbol)) return {segments: details.segments, current: details.current.concat(deprioritizeDots(symbol))};
		if (".,".includes(symbol)) return {segments: details.segments.concat([details.current, symbol]), current: []};

		return {segments: details.segments, current: details.current.concat([symbol])};
	})({segments: [], current: []})(symbols);
	const segments = data.segments;
	const current = data.current;

	return current.length ? segments.concat([current]) : segments;
};
const deprioritizeDots = function(symbols) {
	if (symbols.length < 2) return [symbols];
	if ([".", ","].includes(symbols[0]) && [".", ","].includes(symbols[symbols.length - 1])) return [symbols[0]].concat(deprioritizeMedialDots(symbols.slice(1, -1)), [symbols[symbols.length - 1]]);
	if ([".", ","].includes(symbols[0])) return [symbols[0]].concat(deprioritizeMedialDots(symbols.slice(1)));
	if ([".", ","].includes(symbols[symbols.length - 1])) return deprioritizeMedialDots(symbols.slice(0, -1)).concat([symbols[symbols.length - 1]]);

	return [deprioritizeMedialDots(symbols)];
};
const prioritizeSpaces = function(symbols) {
	return Array.isArray(symbols) ? pipe(
		map(prioritizeSpaces),
		function(symbols) {
			if (symbols.length < 2) return symbols;
			if (none(matches(/^\s+$/))(symbols)) return symbols;

			return pipe(
				reduce(function(acc, value) {
					const lastArray = last(acc);

					if (matches(/^\s+$/)(value)) {
						return lastArray.length ? acc.concat([value, []]) : [value, []];
					} else return acc.slice(0, -1).concat([lastArray.concat([value])]);
				})([[]]),
				function(chunks) {return last(chunks).length ? chunks : chunks.slice(0, -1);}
			)(symbols);
		}
	)(symbols) : symbols;
};
const lookup = function(symbol) {
	switch(symbol) {
		case "+": return "ts.plus";
		case "-": return "ts.minus";
		case ".": return "ts.dot";
		case "[": return "ts.bracketleft";
		case "]": return "ts.bracketright";
		case "#": return "ts.hash";
		case "<": return "ts.less";
		case "/": return "ts.slash";
		case "~": return "ts.tilde";
		case "_": return "ts.underscore";
		case ":": return "ts.colon";
		case "\\": return "ts.backslash";
		case "?": return "ts.question";
		case "@": return "ts.atsign";
		case "*": return "ts.asterisk";
		case "$": return "ts.dollar";
		case "`": return "ts.backtick";
		case "{": return "ts.braceleft";
		case "'": return "ts.apostrophe";
		case ";": return "ts.semicolon";
		case ",": return "ts.comma";
		case "=": return "ts.equal";
		case "|": return "ts.bar";
		case "%": return "ts.percent";
		case "}": return "ts.braceright";
		case "^": return "ts.hat";
		case "&": return "ts.ampersand";
		case ">": return "ts.greater";
		case "!": return "ts.bang";
	}

	return symbol;
};
const getDefinition = function(symbols) {
	if (!symbols.length) return "undefined";
	if (symbols.length === 1) {
		const symbol = symbols[0];

		if (Array.isArray(symbol)) return getDefinition(symbol);
		if (symbol.match(/^\s+$/)) return "[" + symbol + "]";
		if (typeof symbol === "string") {
			if (symbol.startsWith("\"") && symbol.endsWith("\"")) return "`" + symbol.slice(1, -1) + "`";
			return lookup(symbol);
		}
	}

	return pipe(
		reduce(function(details, symbol) {
			if (matches(/^\s+$/)(symbol)) {
				return {sections: details.sections.slice(0, -1).concat((details.sections.length ? details.sections[details.sections.length - 1] : "") + symbol), append: true};
			}
			if (details.append) return {sections: details.sections.concat([getDefinition([symbol])]), append: false};

			const left = details.sections[details.sections.length - 1];
			const right = getDefinition([symbol]);

			const definition = (function() {
				if ((left === "ts.tilde") && isNumber(right)) return "-" + right;
				if ((left === "ts.braceleft") && isString(right)) return right.slice(1, -1).replace(/\\"/g, '"');

				return "ts.apply(" + left + ", " + right + ")";
			})();

			return {sections: details.sections.slice(0, -1).concat([definition]), append: false};
		})({
			sections: [],
			append: true
		}),
		function(details) {
			const processedSections = details.sections[0].match(/^\s+$/) ? [details.sections[0] + details.sections[1]].concat(details.sections.slice(2)) : details.sections;

			return (details.append || (processedSections.length > 1)) ? "[" + processedSections.join(", ") + "]" : processedSections[0];
		}
	)(symbols);
};

const isAlphabetic = function(string) {return /^[a-z]+$/i.test(string);};
const isNumber = function(n) {return !isNaN(parseFloat(n)) && isFinite(n);};
const isString = function(string) {return string.startsWith('`') && string.endsWith('`');}

var isNewSymbol = function(currentToken, character) {
	const jointSymbol = currentToken + character;
	const canAddSymbol = (isNumber(currentToken) && isNumber(jointSymbol)) ||
		(isAlphabetic(currentToken) && isAlphabetic(jointSymbol));
		
		return !canAddSymbol;
};

// if the last token is multi-character and ends with a ., then the dot is a separate token
const getCombinedTokens = function(tokens, currentToken) {return tokens.concat((function() {
	if (!currentToken) return [];
	if ((currentToken.length > 1) && ".,".includes(currentToken[currentToken.length - 1])) return [currentToken.slice(0, -1), currentToken[currentToken.length - 1]];

	return [currentToken];
})());};

const tokenizeTrampoline = function(details) {
	const characters = details.characters;
	const currentToken = details.currentToken;
	const tokens = details.tokens;
	const firstCharacter = characters[0];
	const restCharacters = characters.slice(1);
	
	if (currentToken.startsWith("\"")) {
		if ((firstCharacter === "\"") && (currentToken.slice(-1) !== "\\")) {
			return {characters: restCharacters, currentToken: "", tokens: tokens.concat(currentToken + "\"")};
		}
	} else if (firstCharacter === "(") {
		const data = tokenize(restCharacters);
		const remainingCharacters = data.characters;
		const subtokens = data.tokens;

		// non-array bracketting
		if ((subtokens.length === 1) && !matches(/^\s+$/)(subtokens[0])) {
			return {characters: remainingCharacters, currentToken: "", tokens: getCombinedTokens(tokens, currentToken).concat(subtokens)};
		} else {
			return {characters: remainingCharacters, currentToken: "", tokens: getCombinedTokens(tokens, currentToken).concat([subtokens])};
		}
	} else if (firstCharacter === ")") {
		return {characters: restCharacters, currentToken: "", tokens: getCombinedTokens(tokens, currentToken)};
	} else if (firstCharacter.match(/\s/)) {
		const isCurrentTokenWhitespace = currentToken.match(/^\s+$/);

		return {characters: restCharacters, currentToken: isCurrentTokenWhitespace ? currentToken + firstCharacter : firstCharacter,
			tokens: getCombinedTokens(tokens, isCurrentTokenWhitespace ? "" : currentToken)};
	} else if (isNewSymbol(currentToken, firstCharacter)) {
		return {characters: restCharacters, currentToken: firstCharacter, tokens: getCombinedTokens(tokens, currentToken)};
	}

	return {characters: restCharacters, currentToken: currentToken + firstCharacter, tokens: tokens};
};
const tokenize = function(characters) {
	var acc = {characters: characters, currentToken: "", tokens: []};

	while (acc.characters.length) {
		const exit = (acc.characters[0] === ")") && !acc.currentToken.startsWith("\"");

		acc = tokenizeTrampoline(acc);

		if (exit) break;
	}

	return {characters: acc.characters, tokens: getCombinedTokens(acc.tokens, acc.currentToken)};
};

const stringify = function(value) {
	if (Array.isArray(value)) return "[" + pipe(map(stringify), join(","))(value) + "]";
	if (value == undefined) return "undefined";
	if (typeof value === "string") return JSON.stringify(value.replace(/\\"/g, '"'));

	return value;
};

const getDefinitionJs = function(definitionSymbols) {
	const spacePrioritizedSymbols = prioritizeSpaces(definitionSymbols);
	console.log("spacePrioritizedSymbols", JSON.stringify(spacePrioritizedSymbols));
	const processedSymbols = deprioritizeDots(spacePrioritizedSymbols);
	console.log("processedSymbols", JSON.stringify(processedSymbols));

	const definition = getDefinition(processedSymbols);
	console.log("definition", definition);

	return {definition: definition, processedSymbols: processedSymbols};
};

const processTsBlock = function(userDefinitions) {return function(ts) {
	var updatedDefinitions = userDefinitions;
	var js = "";
	const inlineDefinition = ts[0] === " ";

	const tokensToParse = inlineDefinition ? ts.slice(1) : ts;
	const symbols = tokenize(tokensToParse).tokens;

	console.log("=========================================================");
	console.log("symbols", JSON.stringify(symbols));

	if (inlineDefinition) {
		const firstWhitespace = symbols.findIndex(matches(/^\s+$/));
		const definitionSymbols = (firstWhitespace === -1) ? symbols : symbols.slice(0, firstWhitespace);
		const postDefinitionWhitespace = (firstWhitespace === -1) ? "" : pipe(
			filter(function(symbol) {return (typeof symbol === "string") && symbol.includes("\n");}),
			join("")
		)(symbols.slice(firstWhitespace));
		const definition = getDefinitionJs(definitionSymbols).definition;

		js += definition + postDefinitionWhitespace;
	} else {
		var variable = "";
		var definitionSeparator = "";
		var definitionSymbols = [];
		var comment = false;

		symbols.forEach(function(symbol) {
			if (matches(/^\s+$/)(symbol)) {
				if (definitionSymbols.length) {
					if (!comment) {
						const flattenedSymbols = flatten(definitionSymbols);
						const isRecursive = contains(variable)(flattenedSymbols);

						const result = getDefinitionJs(definitionSymbols);
						const definition = result.definition;
						const processedSymbols = result.processedSymbols;

						const solution = processSymbols(processedSymbols, undefined, updatedDefinitions);
						const declaration =  isRecursive ? "var " + variable + " =" + definitionSeparator + "x => " + definition + "(x);" : "const " + variable + " =" + definitionSeparator + definition + ";";

						js += declaration;
						updatedDefinitions = Object.assign({}, updatedDefinitions, fromPairs([[variable, solution]]));
					}

					if (symbol.includes("\n")) {
						variable = "";
						definitionSeparator = "";
						definitionSymbols = [];
						comment = false;
						js += symbol;
					} else {
						comment = true;
					}
				} else if (variable) {
					definitionSeparator = symbol;
				} else { // before first definition
					js += symbol;
				}
			} else if (!variable) {
				variable = symbol;
			} else if (!comment) {
				definitionSymbols.push(symbol);
			} // ignore text comment on this line
		});
	}

	return {js: js, userDefinitions: updatedDefinitions};
};};

const expandTs = function(blocks, userDefinitions) {
	return pipe(
		map(function(block) {
			if (typeof block === "string") return block;

			const js = expandJs(block.blocks, userDefinitions);

			return '{"' + js + '"';
		}),
		join(""),
		processTsBlock(userDefinitions)
	)(blocks);
};

const expandJs = function(blocks, userDefinitions) {
	var localDefinitions = userDefinitions;

	const js = pipe(
		map(function(block) {
			if (typeof block === "string") return block;

			const result = expandTs(block.blocks, localDefinitions);

			localDefinitions = result.userDefinitions;

			return result.js;
		}),
		join("")
	)(blocks);

	return js;
};

exports.ts2es6 = function(source) {
	const parsed = parse(source);
	const js = expandJs(parsed.blocks, {});

	return js;
};