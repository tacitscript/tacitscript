//==========================================================
// functional utilities

const pipe = (...args) => value => args.reduce((acc, fn) => fn(acc), value);
const prop = property => object => object[property];
const concat = array1 => array2 => [...array1, ...array2];
const map = fn => array => array.map(fn);
const reduce = reducer => startingValue => array => array.reduce(reducer, startingValue);
const startsWith = match => array => array.indexOf(match) === 0;
const join = delimiter => array => array.join(delimiter);
const equals = value => test => value === test;
const matches = regex => test => (typeof test === "string") && test.match(regex);
const splice = (array, start, deleteCount, ...items) => {const copy = array.slice(0); copy.splice(start, deleteCount, ...items); return copy;};
const find = search => reduce((acc, value) => (acc == undefined) ? (search(value) ? value : undefined) : acc)(undefined);
const unnest = reduce((acc, array) => [...acc, ...array])([]);
const combinations = array1 => array2 => unnest(map(value1 => map(value2 => [value1, value2])(array2))(array1));
const filter = check => array => array.filter(check);
const negate = check => value => !check(value);
const reject = check => array => array.filter(negate(check));
const partition = check => array => [filter(check)(array), reject(check)(array)];
const any = check => array => array.some(check);
const none = check => array => !array.some(check);
const tap = sideEffectFn => value => {sideEffectFn(value); return value;};
const all = check => array => array.every(check);
const first = vector => vector[0];
const last = vector => vector[vector.length - 1];
const groupBy = fn => reduce((acc, value) => {const key = fn(value); return (acc[key] == undefined) ? {...acc, [key]: [value]} : {...acc, [key]: [...acc[key], value]};})({});
const values = obj => Object.values(obj);
const forEach = fn => array => array.forEach(fn);
const nth = index => array => array[index];
const path = array => obj => reduce((acc, index) => acc && acc[index])(obj)(array);
const flatten = reduce((acc, value) => [...acc, ...(Array.isArray(value) ? flatten(value) : [value])])([]);
const identity = x => x;
const compact = filter(identity);
const contains = value => array => array.includes(value);
const omit = keys => object => {const copy = {...object}; keys.forEach(key => delete copy[key]); return copy;};

//==================================================================
// type utilities

const isArray = value => Array.isArray(value);
const isObject = value => (typeof value === 'object') && !isArray(value);

//==================================================================
// parsing

const parseTrampoline = data => {
	const {remaining, type, blocks, blockCommentDepth, lineComment, quotationMark} = data;

	if (lineComment) {
		if (remaining[0] !== "\n") return {...data, remaining: remaining.slice(1)};
		// otherwise, add the newline to the block data, and remove the lineComment
	} else if (blockCommentDepth) {
		if (remaining.startsWith("*/")) return {...data, remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth - 1};
		else if (remaining.startsWith("/*")) return {...data, remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth + 1};
		else if (remaining[0] !== "\n") return {...data, remaining: remaining.slice(1)};
		// otherwise, add the newline to the block data
	} else if (!quotationMark && remaining.startsWith("//")) {
		return {...data, remaining: remaining.slice(2), lineComment: true};
	} else if ((type === "js") && !quotationMark && (remaining.match(/^\/\*ts\s{1}/))) {
		let data = {
			type: "ts",
			blocks: [],
			remaining: remaining.slice(4),
			blockCommentDepth: 0,
			lineComment: false,
			quotationMark: "",
		};

		while (data.blockCommentDepth || !data.remaining.startsWith("*/")) {
			data = parseTrampoline(data);
		}

		return {
			...data,
			type: "js",
			blocks: data.blocks.length ? [...blocks, omit(["remaining", "blockCommentDepth", "lineComment"])(data)] : blocks,
			remaining: data.remaining.slice(2),
		};
	} else if (!quotationMark && remaining.startsWith("/*")) {
		return {...data, remaining: remaining.slice(2), blockCommentDepth: blockCommentDepth + 1};
	} else if ((type === "ts") && !quotationMark && remaining.startsWith('{"')) {
		let data = {
			type: "js",
			blocks: [],
			remaining: remaining.slice(2),
			blockCommentDepth: 0,
			lineComment: false,
			quotationMark: "",
		};

		while (data.blockCommentDepth || !data.remaining.startsWith('"')) {
			data = parseTrampoline(data);
		}

		return {
			...data,
			type: "ts",
			blocks: data.blocks.length ? [...blocks, omit(["remaining", "blockCommentDepth", "lineComment"])(data)] : blocks,
			remaining: data.remaining.slice(1),
		};
	} else if (quotationMark && (remaining[0] === "\\")) {
		return { // parse two characters
			...data,
			blocks: blocks.length ? (isObject(last(blocks)) ? [...blocks, ...remaining.slice(0, 2)] : [...blocks.slice(0, -1), `${last(blocks)}${remaining.slice(0, 2)}`]) : [remaining.slice(0, 2)],
			remaining: remaining.slice(2),
		};
	}

	const newQuotationMark = (() => {
		if (quotationMark) return (remaining[0] === quotationMark) ? "" : quotationMark;
		if (blockCommentDepth) return "";

		const validQuotationMarks = (type === "js") ? ['"', "'", "`"] : ['"'];
		const isQuotationMark = validQuotationMarks.includes(remaining[0]);

		return isQuotationMark ? remaining[0] : "";
	})();

	return { // parse one character
		...data,
		blocks: blocks.length ? (isObject(last(blocks)) ? [...blocks, remaining[0]] : [...blocks.slice(0, -1), `${last(blocks)}${remaining[0]}`]) : [remaining[0]],
		remaining: remaining.slice(1),
		lineComment: false,
		quotationMark: newQuotationMark,
	};
};
const parse = remaining => {
	let data = {
		type: "js",
		blocks: [],
		remaining,
		blockCommentDepth: 0,
		lineComment: false,
		quotationMark: "",
	};

	while (data.remaining) {
		data = parseTrampoline(data);
	}

	return omit(["remaining", "blockCommentDepth", "lineComment"])(data);
};

//==========================================================
// tacitscript conversion code

const applySymbols = (left, right) => {
	// first symbol in evaluation
	if (!left) return right;

	return `ts.apply(${left}, ${right})`;
};
const mergeBlocks = ({currentBlock, blocks}) => [...blocks, ...(currentBlock.length ? [currentBlock] : [])];
const processSymbols = ({symbols, acc, userDefinitions}) => {
	if (Array.isArray(symbols)) {
		return pipe(
			// separate into space delimited blocks
			reduce(({currentBlock, blocks}, symbol) => {
				if ((typeof symbol === "string") && symbol.match(/^\s+$/)) {
					return {currentBlock: [], blocks: mergeBlocks({currentBlock, blocks})};
				} else {
					return {currentBlock: [...currentBlock, symbol], blocks};
				}
			})({currentBlock: [], blocks: []}),
			mergeBlocks,
			map(reduce((acc, symbol) => applySymbols(acc, lookup({symbol, userDefinitions})))(undefined)),
			terms => {
				// if any spaces, return the array, otherwise, return terms[0];
				return any(matches(/^\s+$/))(symbols) ? stringify(map(stringify)(terms)) : stringify(terms[0]);
			}
		)(symbols);
	} else {
		return applySymbols(acc, lookup({symbol: symbols, userDefinitions}));
	}
};
const deprioritizeMedialDots = symbols => {
	const {segments, current} = reduce(({segments, current}, symbol) => {
		if (Array.isArray(symbol)) return {segments, current: [...current, ...deprioritizeDots(symbol)]};
		if (".,".includes(symbol)) return {segments: [...segments, current, symbol], current: []};

		return {segments, current: [...current, symbol]};
	})({segments: [], current: []})(symbols);

	return current.length ? [...segments, current] : segments;
};
const deprioritizeDots = symbols => {
	if (symbols.length < 2) return [symbols];
	if ([".", ","].includes(symbols[0]) && [".", ","].includes(symbols[symbols.length - 1])) return [symbols[0], ...deprioritizeMedialDots(symbols.slice(1, -1)), symbols[symbols.length - 1]];
	if ([".", ","].includes(symbols[0])) return [symbols[0], ...deprioritizeMedialDots(symbols.slice(1))];
	if ([".", ","].includes(symbols[symbols.length - 1])) return [...deprioritizeMedialDots(symbols.slice(0, -1)), symbols[symbols.length - 1]];

	return [deprioritizeMedialDots(symbols)];
};
const prioritizeSpaces = symbols => {
	return Array.isArray(symbols) ? pipe(
		map(prioritizeSpaces),
		symbols => {
			if (symbols.length < 2) return symbols;
			if (none(matches(/^\s+$/))(symbols)) return symbols;

			return pipe(
				reduce((acc, value) => {
					const lastArray = last(acc);

					if (matches(/^\s+$/)(value)) {
						return lastArray.length ? [...acc, value, []] : [value, []];
					} else return [...acc.slice(0, -1), [...lastArray, value]];
				})([[]]),
				chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
			)(symbols);
		}
	)(symbols) : symbols;
};
const lookup = symbol => {
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
const getDefinition = symbols => {
	if (!symbols.length) return "undefined";
	if (symbols.length === 1) {
		const symbol = symbols[0];

		if (Array.isArray(symbol)) return getDefinition(symbol);
		if (symbol.match(/^\s+$/)) return `[${symbol}]`;
		if (typeof symbol === "string") {
			if (symbol.startsWith("\"") && symbol.endsWith("\"")) return symbol;
			return lookup(symbol);
		}
	}

	return pipe(
		reduce(({sections, append}, symbol) => {
			if (matches(/^\s+$/)(symbol)) {
				return {sections: [...sections.slice(0, -1), `${sections.length ? sections[sections.length - 1] : ""}${symbol}`], append: true};
			}
			if (append) return {sections: [...sections, getDefinition([symbol])], append: false};

			const left = sections[sections.length - 1];
			const right = getDefinition([symbol]);

			const definition = (() => {
				if ((left === "ts.tilde") && isNumber(right)) return `-${right}`;
				if ((left === "ts.braceleft") && isString(right)) return right.slice(1, -1).replace(/\\"/g, '"');

				return `ts.apply(${left}, ${right})`;
			})();

			return {sections: [...sections.slice(0, -1), definition], append: false};
		})({
			sections: [],
			append: true,
		}),
		({sections, append}) => {
			const processedSections = sections[0].match(/^\s+$/) ? [`${sections[0]}${sections[1]}`, ...sections.slice(2)] : sections;

			return (append || (processedSections.length > 1)) ? `[${processedSections.join(", ")}]` : processedSections[0];
		},
	)(symbols);
};

const isAlphabetic = string => /^[a-z]+$/i.test(string);
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
const isString = string => string.startsWith('"') && string.endsWith('"');

var isNewSymbol = ({currentToken, character}) => {
	const jointSymbol = currentToken + character;
	const canAddSymbol = (isNumber(currentToken) && isNumber(jointSymbol)) ||
		(isAlphabetic(currentToken) && isAlphabetic(jointSymbol));
		
		return !canAddSymbol;
};

// if the last token is multi-character and ends with a ., then the dot is a separate token
const getCombinedTokens = ({tokens, currentToken}) => [...tokens, ...(() => {
	if (!currentToken) return [];
	if ((currentToken.length > 1) && ".,".includes(currentToken[currentToken.length - 1])) return [currentToken.slice(0, -1), currentToken[currentToken.length - 1]];

	return [currentToken];
})()];

const tokenizeTrampoline = ({characters, currentToken, tokens}) => {
	const firstCharacter = characters[0];
	const restCharacters = characters.slice(1);
	
	if (currentToken.startsWith("\"")) {
		if ((firstCharacter === "\"") && (currentToken.slice(-1) !== "\\")) {
			return {characters: restCharacters, currentToken: "", tokens: [...tokens, `${currentToken}\"`]};
		}
	} else if (firstCharacter === "(") {
		const {characters: remainingCharacters, tokens: subtokens} = tokenize(restCharacters);

		// non-array bracketting
		if ((subtokens.length === 1) && !matches(/^\s+$/)(subtokens[0])) {
			return {characters: remainingCharacters, currentToken: "", tokens: [...getCombinedTokens({tokens, currentToken}), ...subtokens]};
		} else {
			return {characters: remainingCharacters, currentToken: "", tokens: [...getCombinedTokens({tokens, currentToken}), subtokens]};
		}
	} else if (firstCharacter === ")") {
		return {characters: restCharacters, currentToken: "", tokens: getCombinedTokens({tokens, currentToken})};
	} else if (firstCharacter.match(/\s/)) {
		const isCurrentTokenWhitespace = currentToken.match(/^\s+$/);

		return {characters: restCharacters, currentToken: isCurrentTokenWhitespace ? `${currentToken}${firstCharacter}` : firstCharacter,
			tokens: getCombinedTokens({tokens, currentToken: isCurrentTokenWhitespace ? "" : currentToken})};
	} else if (isNewSymbol({currentToken, character: firstCharacter})) {
		return {characters: restCharacters, currentToken: firstCharacter, tokens: getCombinedTokens({tokens, currentToken})};
	}

	return {characters: restCharacters, currentToken: `${currentToken}${firstCharacter}`, tokens};
};
const tokenize = characters => {
	let acc = {characters, currentToken: "", tokens: []};

	while (acc.characters.length) {
		const exit = (acc.characters[0] === ")") && !acc.currentToken.startsWith("\"");

		acc = tokenizeTrampoline(acc);

		if (exit) break;
	}

	return {characters: acc.characters, tokens: getCombinedTokens({tokens: acc.tokens, currentToken: acc.currentToken})};
};

const stringify = value => {
	if (Array.isArray(value)) return`[${pipe(map(stringify), join(","))(value)}]`;
	if (value == undefined) return "undefined";
	if (typeof value === "string") return JSON.stringify(value.replace(/\\"/g, '"'));

	return value;
};

const getDefinitionJs = definitionSymbols => {
	const spacePrioritizedSymbols = prioritizeSpaces(definitionSymbols);
	console.log("spacePrioritizedSymbols", JSON.stringify(spacePrioritizedSymbols));
	const processedSymbols = deprioritizeDots(spacePrioritizedSymbols);
	console.log("processedSymbols", JSON.stringify(processedSymbols));

	const definition = getDefinition(processedSymbols);
	console.log("definition", definition);

	return {definition, processedSymbols};
};

const processTsBlock = userDefinitions => ts => {
	let updatedDefinitions = userDefinitions;
	let js = "";
	const inlineDefinition = ts[0] === " ";

	const tokensToParse = inlineDefinition ? ts.slice(1) : ts;
	const symbols = tokenize(tokensToParse).tokens;

	console.log("=========================================================");
	console.log("symbols", JSON.stringify(symbols));

	if (inlineDefinition) {
		const firstWhitespace = symbols.findIndex(matches(/^\s+$/));
		const definitionSymbols = (firstWhitespace === -1) ? symbols : symbols.slice(0, firstWhitespace);
		const postDefinitionWhitespace = (firstWhitespace === -1) ? "" : pipe(
			filter(symbol => (typeof symbol === "string") && symbol.includes("\n")),
			join(""),
		)(symbols.slice(firstWhitespace));
		const {definition} = getDefinitionJs(definitionSymbols);

		js += definition + postDefinitionWhitespace;
	} else {
		let variable = "";
		let definitionSeparator = "";
		let definitionSymbols = [];
		let comment = false;

		symbols.forEach(symbol => {
			if (matches(/^\s+$/)(symbol)) {
				if (definitionSymbols.length) {
					if (!comment) {
						const flattenedSymbols = flatten(definitionSymbols);
						const isRecursive = contains(variable)(flattenedSymbols);

						const {definition, processedSymbols} = getDefinitionJs(definitionSymbols);

						const solution = processSymbols({symbols: processedSymbols, acc: undefined, userDefinitions: updatedDefinitions});
						const declaration =  isRecursive ? `let ${variable} =${definitionSeparator}x => ${definition}(x);` : `const ${variable} =${definitionSeparator}${definition};`;

						js += declaration;
						updatedDefinitions = {...updatedDefinitions, [variable]: solution};
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

	return {js, userDefinitions: updatedDefinitions};
};

var processTsBlocks = lines => {
	let userDefinitions = {}; // {[variable]: String(def)} ! mutating

	return pipe(reduce((lineDetails, line) => {
		if (startsWith("/*ts")(line)) {
			return {
				lines: concat(lineDetails.lines)([""]),
				isTsBlock: true,
				previousTsBlock: true
			};
		} if (startsWith("*/")(line) && lineDetails.isTsBlock) {
			return {
				lines: concat(lineDetails.lines)([""]),
				isTsBlock: false,
				previousTsBlock: lineDetails.previousTsBlock
			};
		} else if (line.startsWith("//")) {
			return {
				lines: concat(lineDetails.lines)([line]),
				isTsBlock: lineDetails.isTsBlock,
				previousTsBlock: lineDetails.previousTsBlock
			};
		} else {
			return {
				lines: concat(lineDetails.lines)([lineDetails.isTsBlock ? (() => {
					const {js, userDefinitions: updatedUserTypes} = ts2js({line, userDefinitions});

					userDefinitions = updatedUserTypes;

					return js;
				})() : line]),
				isTsBlock: lineDetails.isTsBlock,
				previousTsBlock: lineDetails.previousTsBlock
			};
		}
	})({lines: [], isTsBlock: false, previousTsBlock: false}), prop("lines"))(lines);
};

const expandTs = ({blocks, userDefinitions}) => {
	const {js, userDefinitions: processedDefinitions} = pipe(
		map(block => {
			if (typeof block === "string") return block;

			const js = expandJs({blocks: block.blocks, userDefinitions});

			return `{"${js}"`;
		}),
		join(""),
		processTsBlock(userDefinitions),
	)(blocks);

	return {js, userDefinitions: processedDefinitions};
};

const expandJs = ({blocks, userDefinitions}) => {
	let localDefinitions = userDefinitions;

	const js = pipe(
		map(block => {
			if (typeof block === "string") return block;

			const {userDefinitions: updatedDefinitions, js} = expandTs({blocks: block.blocks, userDefinitions: localDefinitions});

			localDefinitions = updatedDefinitions;

			return js;
		}),
		join(""),
	)(blocks);

	return js;
};

var ts2es6 = source => {
	const parsed = parse(source);
	const js = expandJs({blocks: parsed.blocks, userDefinitions: {}});

	return js;
};

//==========================================================
// original babel-plugin source 

var babel = require('systemjs-babel-build').babel;

// the SystemJS babel build includes standard presets
var es2015 = require('systemjs-babel-build').presetES2015;
var es2015Register = require('systemjs-babel-build').presetES2015Register;
var modulesRegister = require('systemjs-babel-build').modulesRegister;
var stage3 = require('systemjs-babel-build').pluginsStage3;
var stage2 = require('systemjs-babel-build').pluginsStage2;
var stage1 = require('systemjs-babel-build').pluginsStage1;
var react = require('systemjs-babel-build').pluginsReact;

var externalHelpers = require('systemjs-babel-build').externalHelpers;
var runtimeTransform = require('systemjs-babel-build').runtimeTransform;

var babelRuntimePath;
var modularHelpersPath = System.decanonicalize('./babel-helpers/', module.id);
var externalHelpersPath = System.decanonicalize('./babel-helpers.js', module.id);
var regeneratorRuntimePath = System.decanonicalize('./regenerator-runtime.js', module.id);

if (modularHelpersPath.substr(modularHelpersPath.length - 3, 3) == '.js')
	modularHelpersPath = modularHelpersPath.substr(0, modularHelpersPath.length - 3);

// in builds we want to embed canonical names to helpers
if (System.getCanonicalName) {
	modularHelpersPath = System.getCanonicalName(modularHelpersPath);
	externalHelpersPath = System.getCanonicalName(externalHelpersPath);
	regeneratorRuntimePath = System.getCanonicalName(regeneratorRuntimePath);
}

// disable SystemJS runtime detection
SystemJS._loader.loadedTranspilerRuntime = true;

function prepend(a, b) {
	for (var p in b)
		if (!(p in a))
			a[p] = b[p];
	return a;
}

/*
 * babelOptions:
 *   modularRuntime: true / false (whether to use babel-runtime or babel/external-helpers respectively)
 *   sourceMaps: true / false (defaults to true)
 *   es2015: true / false (defaults to true)
 *   stage3: true / false (defaults to true)
 *   stage2: true / false (defaults to true)
 *   stage1: true / false (defaults to false)
 *   react: true / false (defaults to false)
 *   plugins: array of custom plugins (objects or module name strings)
 *   presets: array of custom presets (objects or module name strings)
 *   compact: as in Babel
 *   comments: as in Babel
 *
 * babelOptions can be set at SystemJS.babelOptions OR on the metadata object for a given module
 */
var defaultBabelOptions = {
	modularRuntime: true,
	sourceMaps: true,
	es2015: true,
	stage3: true,
	stage2: true,
	stage1: false,
	react: false,
	compact: false,
	comments: true
};

exports.translate = function(load, traceOpts) {
	//=======================================================
	// modified for tacitscript
	var originalSource = load.source;
	load.source = ts2es6(load.source);
	
	// we don't transpile anything other than CommonJS or ESM
	if (load.metadata.format == 'global' || load.metadata.format == 'amd' || load.metadata.format == 'json')
		throw new TypeError('plugin-babel cannot transpile ' + load.metadata.format + ' modules. Ensure "' + load.name + '" is configured not to use this loader.');

	var loader = this;
	var pluginLoader = loader.pluginLoader || loader;

	// we only output ES modules when running in the builder
	var outputESM = traceOpts ? traceOpts.outputESM : loader.builder;

	var babelOptions = {};

	if (load.metadata.babelOptions)
		prepend(babelOptions, load.metadata.babelOptions);

	if (loader.babelOptions)
		prepend(babelOptions, loader.babelOptions);

	prepend(babelOptions, defaultBabelOptions);

	// determine any plugins or preset strings which need to be imported as modules
	var pluginAndPresetModuleLoads = [];

	if (babelOptions.presets)
		babelOptions.presets.forEach(function(preset) {
			if (typeof preset == 'string')
				pluginAndPresetModuleLoads.push(pluginLoader['import'](preset, module.id));
		});

	if (babelOptions.plugins)
		babelOptions.plugins.forEach(function(plugin) {
			plugin = typeof plugin == 'string' ? plugin : Array.isArray(plugin) && typeof plugin[0] == 'string' && plugin[0];
			if (!plugin)
				return;
			pluginAndPresetModuleLoads.push(pluginLoader.import(plugin, module.id).then(function (m) {
				return m.default || m;
			}));
		});

	return Promise.all(pluginAndPresetModuleLoads)
	.then(function(pluginAndPresetModules) {
		var curPluginOrPresetModule = 0;

		var presets = [];
		var plugins = [];

		if (babelOptions.modularRuntime) {
			if (load.metadata.format == 'cjs')
				throw new TypeError('plugin-babel does not support modular runtime for CJS module transpilations. Set babelOptions.modularRuntime: false if needed.');
			presets.push(runtimeTransform);
		}
		else {
			if (load.metadata.format == 'cjs')
				load.source = 'var babelHelpers = require("' + externalHelpersPath + '");' + load.source;
			else
				load.source = 'import babelHelpers from "' + externalHelpersPath + '";' + load.source;
			presets.push(externalHelpers);
		}

		if (babelOptions.es2015)
			presets.push((outputESM || load.metadata.format == 'cjs') ? es2015 : es2015Register);
		else if (!(outputESM || load.metadata.format == 'cjs'))
			presets.push(modulesRegister);

		if (babelOptions.stage3)
			presets.push({
				plugins: stage3
			});

		if (babelOptions.stage2)
			presets.push({
				plugins: stage2
			});

		if (babelOptions.stage1)
			presets.push({
				plugins: stage1
			});

		if (babelOptions.react)
			presets.push({
				plugins: react
			});

		if (babelOptions.presets)
			babelOptions.presets.forEach(function(preset) {
				if (typeof preset == 'string')
					presets.push(pluginAndPresetModules[curPluginOrPresetModule++]);
				else
					presets.push(preset);
			});

		if (babelOptions.plugins)
			babelOptions.plugins.forEach(function(plugin) {
				if (typeof plugin == 'string')
					plugins.push(pluginAndPresetModules[curPluginOrPresetModule++]);
				else if (Array.isArray(plugin) && typeof plugin[0] == 'string')
					plugins.push([pluginAndPresetModules[curPluginOrPresetModule++], plugin[1]]);
				else
					plugins.push(plugin);
			});

		var output = babel.transform(load.source, {
			babelrc: false,
			plugins: plugins,
			presets: presets,
			filename: load.address,
			sourceFileName: load.address,
			moduleIds: false,
			sourceMaps: traceOpts && traceOpts.sourceMaps || babelOptions.sourceMaps,
			inputSourceMap: load.metadata.sourceMap,
			compact: babelOptions.compact,
			comments: babelOptions.comments,
			code: true,
			ast: true,
			resolveModuleSource: function(m) {
				if (m.substr(0, 22) == 'babel-runtime/helpers/') {
					m = modularHelpersPath + m.substr(22) + '.js';
				}
				else if (m == 'babel-runtime/regenerator') {
					m = regeneratorRuntimePath;
				}
				else if (m.substr(0, 14) == 'babel-runtime/') {
					if (!babelRuntimePath) {
						babelRuntimePath = System.decanonicalize('babel-runtime/', module.id);
						if (babelRuntimePath[babelRuntimePath.length - 1] !== '/')
							babelRuntimePath += '/';
						if (babelRuntimePath.substr(babelRuntimePath.length - 3, 3) == '.js')
							babelRuntimePath = babelRuntimePath.substr(0, babelRuntimePath.length - 3);
						if (loader.getCanonicalName)
							babelRuntimePath = loader.getCanonicalName(babelRuntimePath);
						if (babelRuntimePath == 'babel-runtime/')
							throw new Error('The babel-runtime module must be mapped to support modular helpers and builtins. If using jspm run jspm install npm:babel-runtime.');
					}
					m = babelRuntimePath + m.substr(14) + '.js';
				}
				return m;
			}
		});

		// add babelHelpers as a dependency for non-modular runtime
		if (!babelOptions.modularRuntime)
			load.metadata.deps.push(externalHelpersPath);

		// set output module format
		// (in builder we output modules as esm)
		if (!load.metadata.format || load.metadata.format == 'detect' || load.metadata.format == 'esm')
			load.metadata.format = outputESM ? 'esm' : 'register';

		load.metadata.sourceMap = output.map;

		//==================================================
		// modified for ts2es6
		output.map.sourcesContent[0] = originalSource;

		return output.code;
	});
};