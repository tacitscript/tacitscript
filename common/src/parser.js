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
const first = vector => vector[0];
const flatten = reduce(function(acc, value) {return acc.concat(Array.isArray(value) ? flatten(value) : [value]);})([]);
const contains = function(value) {return function(array) {return array.includes(value);};};
const omit = function(keys) {return function(object) {const copy = Object.assign({}, object); keys.forEach(function(key) {delete copy[key];}); return copy;};};
const fromPairs = function(pairs) {return pairs.reduce(function(prev, curr) {prev[curr[0]] = curr[1]; return prev;}, {});};
const equals = function(left) {return function(right) {return left === right;}};
const combinations = array1 => array2 => unnest(map(value1 => map(value2 => [value1, value2])(array2))(array1));
const unnest = arrays => {let result = [], length = arrays.length; for (let i = 0; i < length; i += 1) Array.prototype.push.apply(result, arrays[i]); return result;};
const values = obj => Object.values(obj);
const slice = (...args) => array => array.slice.apply(array, args);
const identity = x => x;
const splice = (array, start, deleteCount, ...items) => {const copy = array.slice(0); copy.splice(start, deleteCount, ...items); return copy;};

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

		while (data.remaining && (data.blockCommentDepth || data.quotationMark || data.lineComment || !data.remaining.startsWith("*/"))) {
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
	if (symbols.length < 2) return [map(symbol => Array.isArray(symbol) ? deprioritizeDots(symbol) : symbol)(symbols)];
	if (symbols.length === 1) return [Array.isArray(symbols[0]) ? deprioritizeDots(symbols[0]) : symbols[0]];
	if ([".", ","].includes(symbols[0]) && [".", ","].includes(symbols[symbols.length - 1])) return [symbols[0]].concat(deprioritizeMedialDots(symbols.slice(1, -1)), [symbols[symbols.length - 1]]);
	if ([".", ","].includes(symbols[0])) return [symbols[0]].concat(deprioritizeMedialDots(symbols.slice(1)));
	if ([".", ","].includes(symbols[symbols.length - 1])) return deprioritizeMedialDots(symbols.slice(0, -1)).concat([symbols[symbols.length - 1]]);

	return [deprioritizeMedialDots(symbols)];
};
const isBinaryOperator = operator => ",.+/<>-:?@*$'|%^&`=".includes(operator);
const prioritizeSpaces = function(symbols) {
	const result = Array.isArray(symbols) ? pipe(
		map(prioritizeSpaces),
		function(symbols) {
			if (symbols.length < 2) return symbols;

			const isWhitespace = matches(/^\s+$/);

			if (none(isWhitespace)(symbols)) return symbols;

			// support binary operator defined by spaces either side
			const binarySpaceSymbols = (() => {
				const firstSpaceIndex = symbols.findIndex(isWhitespace);

				if ((firstSpaceIndex > 0) &&
					(symbols.length > (firstSpaceIndex + 3)) &&
					(filter(isWhitespace)(symbols).length === 2) &&
					(isWhitespace(symbols[firstSpaceIndex + 2])) &&
					isBinaryOperator(symbols[firstSpaceIndex + 1])) return [symbols.slice(0, firstSpaceIndex), symbols[firstSpaceIndex + 1], symbols.slice(firstSpaceIndex + 3)];

				return symbols;
			})();

			return pipe(
				reduce(function(acc, value) {
					const lastArray = last(acc);

					if (matches(/^\s+$/)(value)) {
						return lastArray.length ? acc.concat([value, []]) : [value, []];
					} else return acc.slice(0, -1).concat([lastArray.concat([value])]);
				})([[]]),
				function(chunks) {return last(chunks).length ? chunks : chunks.slice(0, -1);}
			)(binarySpaceSymbols);
		}
	)(symbols) : symbols;

	return result;
};
const applyCharacter = ({remaining: incomingRemaining, current}) => {
	const character = incomingRemaining[0];
	const remaining = incomingRemaining.slice(1);

	switch (character) {
		case "0": return {remaining, current: [...current, []]}; break;
		case "1": return {remaining, current: [...current, [[], []]]}; break;
		case "2": return {remaining, current: [...current, [[], [], []]]}; break;
		case "(": {
			let subResult = {remaining, current: []};

			while (subResult.remaining[0] !== ")") {
				subResult = applyCharacter(subResult);
			}

			return {remaining: subResult.remaining.slice(1), current: [...current, subResult.current]};
		}
	}
};
const getType = string => {
	let result = {remaining: string, current: []};

	while (result.remaining) {
		result = applyCharacter(result);
	}

	return result.current;
};
const getTypes = map(getType);
const lookupSymbol = function(symbol, userDefinition) {
	switch(symbol) {
		case "+": return {definition: "ts.plus", types: getTypes(["000" /* stringConcat, add, arrayConcat, merge */])};
		case "-": return {definition: "ts.minus", types: getTypes(["000" /* subtract, splice, omitKey */, "001" /* stringReplace */])};
		case ".": return {definition: "ts.dot", types: getTypes(["111" /* pipe */, "122" /* unaryBinaryPipe */, "212" /* binaryUnaryPipe */])};
		case "[": return {definition: "ts.bracketleft", types: getTypes(["00" /* first */])};
		case "]": return {definition: "ts.bracketright", types: getTypes(["00" /* length */])};
		case "#": return {definition: "ts.hash", types: getTypes(["00" /* length */])};
		case "<": return {definition: "ts.less", types: getTypes(["000" /* lessThan */, "100" /* sort */])};
		case "/": return {definition: "ts.slash", types: getTypes(["000" /* divide */])};
		case "~": return {definition: "ts.tilde", types: getTypes(["22" /* flip */, "00" /* transpose */])};
		case "_": return "ts.underscore";
		case ":": return {definition: "ts.colon", types: getTypes(["000" /* pair */])};
		case "\\": return {definition: "ts.backslash", types: [[[], []]]};
		case "?": return {definition: "ts.question", types: getTypes(["111" /* if */, "000" /* random */, "100" /* filter */])};
		case "@": return {definition: "ts.atsign", types: getTypes(["200" /* accumulate */, "100" /* findIndex */, "000" /* indexOf */])};
		case "*": return {definition: "ts.asterisk", types: getTypes(["000" /* times */])};
		case "$": return {definition: "ts.dollar", types: getTypes(["211" /* fork */, "000" /* join, append */])};
		case "`": return {definition: "ts.backtick", types: getTypes(["000", /* constant */])};
		case "{": return "ts.braceleft";
		case "'": return {definition: "ts.apostrophe", types: getTypes(["000" /* round, at, prop, path */, "100" /* find */])};
		case ";": return {definition: "ts.semicolon", types: getTypes(["00" /* identity */])};
		case ",": return {definition: "ts.comma", types: getTypes(["010" /* applyToUnary */, "021" /* applyToBinary */, "2(10)1" /* binaryUnaryApply */, "2(100)2" /* binaryBinaryApply */])};
		case "=": return {definition: "ts.equal", types: getTypes(["000" /* equals */])};
		case "|": return {definition: "ts.bar", types: getTypes(["000" /* orValue */, "111" /* orPredicate */, "222" /* orComparator */])};
		case "%": return {definition: "ts.percent", types: getTypes(["000" /* remainder, split, chunk, chunkWithDelimiter */, "100" /* groupBy */, "200" /* chunkWhenComparator */])};
		case "}": return "ts.braceright";
		case "^": return {definition: "ts.hat", types: getTypes(["000" /* power */, "100" /* generate */, "111" /* scan */])};
		case "&": return {definition: "ts.ampersand", types: getTypes(["000" /* andValue */, "111" /* andPredicate */, "100" /* map, mapObject */])};
		case ">": return {definition: "ts.greater", types: getTypes(["000" /* greaterThan */, "101" /* over */])};
		case "!": return {definition: "ts.bang", types: getTypes(["00" /* notValue */])};
	}

	const existing = userDefinition[symbol];

	if (existing) return {definition: symbol, types: existing.types};
	if (symbol == +symbol) return {definition: symbol, types: [[]]};

	console.error("Unknown symbol", symbol);
};
const typeMatch = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const apply = ({left, leftTypes, right, rightTypes}) => {
	const extractUnique = getId => pipe(
		reduce((acc, types) => ({...acc, [getId(types)]: types}))({}),
		values,
	);
	const allCombinations = extractUnique(JSON.stringify)(combinations(leftTypes)(rightTypes));

	// binary left application
	const binaryLeftSolutions = filter(([leftType, rightType]) => (rightType.length === 3) && typeMatch(leftType, rightType[0]))(allCombinations);
	if (binaryLeftSolutions.length) {
		const definition = `ts.leftApply(${left}, ${right})`;
		const types = pipe(
			map(pipe(last, slice(1))),
			extractUnique(identity),
		)(binaryLeftSolutions);

		return {definition, types};
	}

	// binary right application
	const binaryRightSolutions = filter(([leftType, rightType]) => (leftType.length == 3) && typeMatch(leftType[1], rightType))(allCombinations);
	if (binaryRightSolutions.length) {
		const definition = `ts.rightApply(${left}, ${right})`;
		const types = pipe(
			map(pipe(first, type => splice(type, 1, 1))),
			extractUnique(identity),
		)(binaryRightSolutions);

		return {definition, types};
	}

	// unary application
	const unarySolutions = filter(([leftType, rightType]) => (leftType.length === 2) && typeMatch(leftType[0], rightType))(allCombinations);
	if (unarySolutions.length) {
		const definition = `${left}(${right})`;
		const types = pipe(
			map(pipe(first, last)),
			extractUnique(identity),
		)(unarySolutions);

		return {definition, types};
	}

	let leftString = "Fn";
	let rightString = "Fn";

	try {leftString = toString(left);} catch (_) {}
	try {rightString = toString(right);} catch(_) {}

	throw `Unable to resolve dynamic function application: ${leftString}(${rightString})`;
};
const getDefinition = function(symbols, userDefinitions) {
	if (!symbols.length) return {definition: false, types: [[]]};
	if (symbols.length === 1) {
		const symbol = symbols[0];

		if (Array.isArray(symbol)) return getDefinition(symbol, userDefinitions);
		if (symbol.match(/^\s+$/)) return {definition: "[" + symbol + "]", types: [[]]}; // empty array

		// if (typeof symbol === "string") {
		if (symbol.startsWith("\"") && symbol.endsWith("\"")) return {definition: "`" + symbol.slice(1, -1) + "`", types: [[]]};

		return lookupSymbol(symbol, userDefinitions);
		// }
	}

	return pipe(
		reduce(function(details, symbol) {
			if (matches(/^\s+$/)(symbol)) {
				return {sections: details.sections.slice(0, -1).concat((details.sections.length ? details.sections[details.sections.length - 1] : "") + symbol), append: true, types: details.types};
			}
			if (details.append) {
				const {definition, types} = getDefinition([symbol], userDefinitions);

				return {sections: details.sections.concat([definition]), append: false, types};
			}

			const left = details.sections[details.sections.length - 1];
			const {definition: right, types: rightTypes} = getDefinition([symbol], userDefinitions);
			const {definition, types} = apply({left, leftTypes: details.types, right, rightTypes});

			return {sections: details.sections.slice(0, -1).concat([definition]), append: false, types};
		})({
			sections: [],
			append: true,
			types: [],
		}),
		function(details) {
			const processedSections = details.sections[0].match(/^\s+$/) ? [details.sections[0] + details.sections[1]].concat(details.sections.slice(2)) : details.sections;

			return {
				definition: (details.append || (processedSections.length > 1)) ? "[" + processedSections.join(", ") + "]" : processedSections[0],
				types: details.types,
			};
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
	if (typeof value === "boolean") return value ? "true" : "false";

	return value;
};

const getDefinitionJs = function(definitionSymbols, userDefinitions) {
	const spacePrioritizedSymbols = prioritizeSpaces(definitionSymbols);
	console.log("spacePrioritizedSymbols", JSON.stringify(spacePrioritizedSymbols));
	const processedSymbols = deprioritizeDots(spacePrioritizedSymbols);
	console.log("processedSymbols", JSON.stringify(processedSymbols));

	const {definition, types} = getDefinition(processedSymbols, userDefinitions);
	console.log("definition", definition);
	console.log("types", types);

	return {definition: definition, types: types, processedSymbols: processedSymbols};
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
		const definition = getDefinitionJs(definitionSymbols, updatedDefinitions).definition;

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

						const result = getDefinitionJs(definitionSymbols, updatedDefinitions);
						const definition = result.definition;
						// const processedSymbols = result.processedSymbols;
						// const types = result.types;

						//const solution = processSymbols(processedSymbols, types, updatedDefinitions);
						const declaration =  isRecursive ? "var " + variable + " =" + definitionSeparator + "x => " + definition + "(x); " + variable + '.types = [[["V", "V"], "V"], ["V", "V"]];' : "const " + variable + " =" + definitionSeparator + definition + ";";

						const noComment = symbol.includes("\n");
						js += declaration + (noComment ? "" : " //");
						updatedDefinitions = Object.assign({}, updatedDefinitions, fromPairs([[variable, result]]));
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
			} else {
				js += " " + symbol; // comments
			}
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

const ts2es6 = function(source) {
	const parsed = parse(source);
	const js = expandJs(parsed.blocks, {});
	getType("2(10)1");
	return js;
};

exports.ts2es6 = ts2es6;
