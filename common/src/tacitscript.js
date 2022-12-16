import parser from "./parser.js";

const {ts2es6} = parser;

///==========================================================
// functional utilites

const pipe = (...args) => value => args.reduce((acc, fn) => fn(acc), value);
const map = fn => array => array.map(fn);
const mapObj = fn => object => Object.assign({}, ...Object.keys(object).map(key => ({[key]: fn(object[key])})));
const mapObjIndexed = fn => object => Object.assign({}, ...Object.keys(object).map(key => ({[key]: fn(object[key], key)})));
const reduce = reducer => startingValue => array => array.reduce(reducer, startingValue);
const find = search => reduce((acc, value) => (acc == undefined) ? (search(value) ? value : undefined) : acc)(undefined);
const mergeDeep = (...objects) => {
	const isObject = item => (item && typeof item === 'object' && !isArray(item))
	return objects.reduce((prev, obj) => {
		Object.keys(obj).forEach(key => {
			const pVal = prev[key];
			const oVal = obj[key];

			if (isObject(pVal) && isObject(oVal)) {
				prev[key] = mergeDeep(pVal, oVal);
			} else {
				prev[key] = oVal;
			}
		});

		return prev;
	}, {});
};
const join = delimiter => array => {
	return array.join(delimiter);
};
const toPairs = obj => Object.entries(obj);
const fromPairs = pairs => Object.fromEntries(pairs);
const filter = check => array => array.filter(check);
const contains = value => array => array.includes(value);
const pick = keys => object => pipe(toPairs, filter(([key]) => contains(key)(keys)), fromPairs)(object);
const sortBy = fn => array => [...array].sort((a, b) => {const valA = fn(a), valB = fn(b); return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;});
const last = array => array[array.length - 1];
const combinations = array1 => array2 => unnest(map(value1 => map(value2 => [value1, value2])(array2))(array1));
const unnest = arrays => {let result = [], length = arrays.length; for (let i = 0; i < length; i += 1) Array.prototype.push.apply(result, arrays[i]); return result;};
const splice = (array, start, deleteCount, ...items) => {const copy = array.slice(0); copy.splice(start, deleteCount, ...items); return copy;};
const omit = keys => object => {const copy = {...object}; keys.forEach(key => delete copy[key]); return copy;};
const path = array => obj => reduce((acc, index) => acc && acc[index])(obj)(array);
const all = check => array => array.every(check);
const flatten = values => {let result = [], length = values.length; for (let i = 0; i < length; i += 1) {const value = values[i]; Array.prototype.push.apply(result, Array.isArray(value) ? flatten(value) : [value]);} return result;};
const groupBy = fn => array => {let result = [], length = array.length; for (let i = 0; i < length; i += 1) {const value = array[i], key = fn(value); if (result[key] == undefined) result[key] = [value]; else result[key].push(value);} return result;};
const identity = x => x;
const values = obj => Object.values(obj);
const any = check => array => array.some(check);
const take = number => array => array.slice(0, number);
const append = value => array => [...array, value];
const first = array => array[0];

//==========================================================
// stream utilities

const lazyScan = ({next, start}) => function*() {
	let result = [...start];

	while (true) {
		const newValue = next(result);

		if (newValue == undefined) return;

		result.push(newValue);

		yield newValue;
	}
};
const processStream = ({generator, reducer}) => function*() {
	let result = [];
	let stream = generator();

	while (true) {
		const inputValue = stream.next().value;

		if (inputValue == undefined) return; // stream expended

		const newValue = reducer(result, inputValue);

		if (newValue == undefined) continue; // value culled

		result.push(newValue);

		yield newValue;
	}
};
const streamTake = ({n, generator}) => function*() {let i = 0; for (const val of generator()) {if (i >= n) return; i += 1; yield val;}};

//==========================================================
// ts functional utilities using ts logic (falsey is only undefined or false)

const tsPredicate = fn => tsPredicate => {const predicate = value => {const result = tsPredicate(value); return isTruthy(result);}; return fn(predicate);};
const tsFilter = tsPredicate(filter);
const tsFind = tsPredicate(find);

const trampoline = fn => {
	while (fn && (typeof fn === "function")) fn = fn();

	return fn;
};
// ---------------------------------------------------------
// This code illustrates use of the trampoline
// const factorialIter = (x, acc) => {
// 	if (x === 1) return acc;

// 	return () => factorialIter(x - 1, acc * x);
// }
// const factorial = x => {
// 	return trampoline(() => factorialIter(x, 1));
// };
// factorial(10);

const recurseIter = ({A, B, p}, acc) => {
	if (!isArray(p)) return acc;

	return () => recurseIter({A, B, p: p[0]}, B(A(p[1]), acc));
};
const recurse = ({A, B, p}) => {
	return trampoline(() => recurseIter({A, B, p: p[0]}, A(p[1])))
};

//==========================================================
// type utilites

const isUndefined = value => value == undefined;
const isString = value => typeof value === "string";
const isNumber = value => (type => (type === "number") || (type === "bigint"))(typeof value);
const isFunction = value => typeof value === "function";
const isArray = value => Array.isArray(value);
const isObject = value => (typeof value === 'object') && !isArray(value);
const isBoolean = value => typeof value === "boolean";
const isFalsey = value => {
    if (isUndefined(value)) return true;
    if (value === false) return true;
    if (value === "") return true;
    if (isArray(value) && !value.length) return true;
    if (isObject(value) && !Object.keys(value).length) return true;

    return false;
};
const isTruthy = value => !isFalsey(value);
const isStream = value => ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(value.constructor.name);
const arity = value => {
	if (!isFunction(value)) return 0;

	if (value.length < 1) return 1;
	if (value.length > 2) return 2;

	return value.length;
};
const isBinaryFunction = value => arity(value) === 2;
const isUnaryFunction = value => arity(value) === 1;
const isValue = value => arity(value) === 0;
const isVector = value => isArray(value) || isString(value);
const types = value => {
	if (value == undefined) return ["?"];
	if (isArray(value)) return ["A"];
	if (isString(value)) return ["S"];
	if (isNumber(value)) return ["N"];
	if (isStream(value)) return ["L"];
	if (isObject(value)) return ["O"];
	if (isBoolean(value)) return ["B"];
	//if (isFunction(value)) return arity(value);

	if (isFunction(value)) return value.types || (contains(value.length)([0, 1]) ? [["V", "V"]] : [["V", "V", "V"]]); // assume referenced js functions and not higher order

//	return [[0]];
};

const fromPairList = ([left, right]) => [...((left === undefined) ? [] : fromPairList(left)), right];
const toPairList = array => [(array.length === 1) ? undefined : toPairList(array.slice(0, -1)) , array[array.length - 1]];

//==========================================================
// application utilities

const applyOver = ({path, fn, container}) => {
	const key = path[0];

	if (isNumber(key)) { // array index
		const index = (key < 0) ? (container.length + key) : key;

		if ((index < 0) || (index > (container.length - 1))) {
			console.warn(`Attempt to apply function at array index out of bounds: ${JSON.stringify({key, container})}`);

			return container;
		}

		return [...container.slice(0, index), (path.length === 1) ? fn(container[index]) : applyOver({path: path.slice(1), fn, container: container[index]}), ...container.slice(index + 1)];
	} else { // object key
		return {
			...container,
			[key]: (path.length === 1) ? fn(container[key]) : applyOver({path: path.slice(1), fn, container: container[key] || {}})
		};
	}
};

const replaceType = ({from, to}) => type => {
	if (!Array.isArray(type)) return (type === from) ? to : type;
	return type.map(replaceType({from, to}));
};
const getSymbolMap = (acceptorSymbol, donorSymbol) => {
	if ("XYZW".includes(acceptorSymbol)) return [[acceptorSymbol, donorSymbol]];

	return [];
}
const getTypeMap = (acceptorType, donorType) => {
	if (!Array.isArray(acceptorType)) return [...getSymbolMap(acceptorType, donorType)];
	return acceptorType.map((value, index) => getTypeMap(value, donorType[index])).flat();
};
const reduceType = ({type, typeMap}) => reduce((acc, [from, to]) => Array.isArray(acc) ? acc.map(replaceType({from, to})) : replaceType({from, to})(acc))(type)(typeMap);
const getReducedType = ({remainderType, typeMap}) => {
	const reducedType = reduceType({type: remainderType, typeMap});

	// if any XYZW symbol occurs only once in a type, we change to ?
	const typeSymbols = Array.isArray(reducedType) ? flatten(reducedType) : [reducedType];
	const reductionMap = pipe(
		groupBy(identity),
		values,
		filter(symbols => (symbols.length === 1) && "XYZW".includes(symbols[0])),
		map(([symbol]) => [symbol, "?"])
	)(typeSymbols);

	return reduceType({type: reducedType, typeMap: reductionMap});
};
const getReducedUnaryType = ({leftType, rightType}) => getReducedType({remainderType: leftType[1], typeMap: getTypeMap(leftType[0], rightType)});
const getReducedLeftAppliedType = ({leftType, rightType}) => getReducedType({remainderType: rightType.slice(1), typeMap: getTypeMap(rightType[0], leftType)});
const getReducedRightAppliedType = ({leftType, rightType}) => getReducedType({remainderType: splice(leftType, 1, 1), typeMap: getTypeMap(leftType[1], rightType)});
const matchSymbol = (left, right) => {
	return (left === right) ||
		"XYZW?".includes(left) ||
		"XYZW?".includes(right) ||
		any(([source, match]) => (source === "V") && !Array.isArray(match))([[left, right], [right, left]]);
};
const matchType = (left, right) => {
	const match = matchSymbol(left, right) ||
		(Array.isArray(left) && Array.isArray(right) && (left.length === right.length) && left.map((value, index) => matchType(value, right[index])).reduce((acc, value) => acc && value, true) && pipe( // match fields which have to be the same from other specification
			map(([source, match]) => all(symbol => {
				const matchIndices = source.reduce((acc, sourceSymbol, index) => (symbol === sourceSymbol) ? [...acc, index] : acc, []);

				return matchIndices.length ? all(index => matchType(match[index], match[matchIndices[0]]))(matchIndices) : true;
			})(["X", "Y", "Z", "W"])),
			reduce((acc, value) => acc && value)(true),
		)([[left, right], [right, left]]));

	return match;
};
const apply = (left, right) => {
	const leftTypes = types(left);
	const rightTypes = types(right);
	const allCombinations = pipe(
		reduce((acc, types) => ({...acc, [JSON.stringify(types)]: types}))({}),
		values,
	)(combinations(leftTypes)(rightTypes));

	// binary left application
	const binaryLeftSolutions = filter(([leftType, rightType]) => Array.isArray(rightType) && (rightType.length == 3) && matchType(leftType,  rightType[0]))(allCombinations);
	if (binaryLeftSolutions.length) {
		//const types = map(([_, rightType]) => rightType.slice(1))(binaryLeftSolutions);
		let result = leftApply(left, right);

		if (isFunction(result)) {
			if (!result.types) result.types = map(([leftType, rightType]) => getReducedLeftAppliedType({leftType, rightType}))(binaryLeftSolutions);
		}

		return result;
	}

	// binary right application
	const binaryRightSolutions = filter(([leftType, rightType]) => Array.isArray(leftType) && (leftType.length == 3) && matchType(leftType[1], rightType))(allCombinations);
	if (binaryRightSolutions.length) {
		//const types =  map(([leftType]) => splice(leftType, 1, 1))(binaryRightSolutions);
		let result = rightApply(left, right);

		if (isFunction(result)) {
			if (!result.types) result.types =  map(([leftType, rightType]) => getReducedRightAppliedType({leftType, rightType}))(binaryRightSolutions);
		}

		return result;
	}

	// unary application
	const unarySolutions = filter(([leftType, rightType]) => Array.isArray(leftType) && (leftType.length == 2) && matchType(leftType[0], rightType))(allCombinations);
	if (unarySolutions.length) {
		let result = left(right);

		if (isFunction(result) && !result.types) result.types = map(([leftType, rightType]) => getReducedUnaryType({leftType, rightType}))(unarySolutions);

		return result;
	}

	let leftString = "Fn";
	let rightString = "Fn";

	try {leftString = toString(left);} catch (_) {}
	try {rightString = toString(right);} catch(_) {}

	throw `Unable to resolve dynamic function application: ${leftString}(${rightString})`;
};
const typeOf = value => {
	if (value == undefined) return "U";
	if (isArray(value)) return "A";
	if (isString(value)) return "S";
	if (isNumber(value)) return "N";
	if (isStream(value)) return "L";
	if (isObject(value)) return "O";
	if (isBoolean(value)) return "B";
	if (isFunction(value)) return arity(value);

	throw `Unknown type of value: ${value}`;
};
const toEncodedString = value => {
	if (isString(value)) return `"${value}"`;

	const pair = false;//isArray(value);

	return `${pair ? "(" : ""}${toString(value)}${pair ? ")" : ""}`;
};
const toString = value => {
	if (value === false) return "()";
	if (value === true) return "!()";
	if (isNumber(value)) return (value < 0) ? `_${-value}` : `${value}`;
	if (isString(value)) return value;
	if (isArray(value)) return `(${pipe(map(value => toEncodedString(value)), join(" "))(value)}${(value.length < 2) ? " " : ""})`;
	if (isObject(value)) return `(\\${toString(Object.entries(value, true))})`;

	throw "Unable to stringify value";
};
const transpose = array => {
	var newArray = [], origArrayLength = array.length, arrayLength = Math.min.apply(Math, map(array => array.length)(array)), i;
	for(i = 0; i < arrayLength; i++){
		newArray.push([]);
	};

	for(i = 0; i < origArrayLength; i++){
		for(var j = 0; j < arrayLength; j++){
			newArray[j].push(array[i][j]);
		};
	};

	return newArray;
};
const chunk = ({sizes, vector, newVector}) => pipe(
	array => {
		let result = [newVector];
		const length = array.length;

		for (let i = 0; i < length; i += 1) {
			const value = array[i];
			const lastLength = last(result).length;
			const index = result.length - 1;
			const lastFinalLength = (() => {
				const rebasedIndex = index % sizes.length;
				const size = sizes[index % sizes.length];
				
				if (!size && (rebasedIndex === (sizes.length - 1))) return Infinity; // final 0

				return size;
			})();

			if (lastLength < (lastFinalLength - 1)) {
				let last = result.pop(); 

				if (isArray(newVector)) last.push(value);
				else last = `${last}${value}`; // string
				
				result.push(last);
			}
			else if (lastLength === (lastFinalLength - 1)) {
				let last = result.pop();
				
				if (isArray(newVector)) {last.push(value); result.push(last, []);}
				else result.push(`${last}${value}`, "");
			}
			else result.push([value]); // lastFinalLength was 0
		}

		return result;
	},
	chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
)(vector);
const chunkWhenPredicate = ({when, vector, newVector}) => pipe(
	array => {
		let result = [newVector];
		const length = array.length;

		for (let i = 0; i < length; i += 1) {
			const value = array[i];

			if (!when(value)) {
				let last = result.pop();

				if (isArray(newVector)) last.push(value);
				else last = `${last}${value}`; // string

				result.push(last);
			}
			else {
				if (isArray(newVector)) result.push([value])
				else result.push(`${value}`);
			}
		}

		return result;
	},
	chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
)(vector);
const chunkWhenComparator = ({when, vector, newVector}) => pipe(
	array => {
		let result = [newVector];
		const length = array.length;

		for (let i = 0; i < length; i += 1) {
			const value = array[i];
			const lastArray = last(result);

			if ((lastArray.length < 1) || !when(last(lastArray), value)) {
				let last = result.pop();

				if (isArray(newVector)) last.push(value);
				else last = `${last}${value}`; // string

				result.push(last);
			}
			else {
				if (isArray(newVector)) result.push([value])
				else result.push(`${value}`);
			}
		}

		return result;
	},
	chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
)(vector);
const leftApply = (left, binaryFn) => right => {
	if ((left == undefined) || (right == undefined)) return undefined;

	return binaryFn(left, right);
};
const rightApply = (binaryFn, right) => left => {
	if ((left == undefined) || (right == undefined)) return undefined;

	return binaryFn(left, right);
};
const scanInternal = ({left, right, startingPair}) => {
	let result = startingPair;

	while (isTruthy(left(result))) result = [result, right(result)];

	return result;
};
const whileInternal = ({whileCondition, next, start}) => {
	let result = start;

	while (isTruthy(whileCondition(result))) result = next(result);

	return result;
};

//==========================================================
// OPERATORS

const errorBinary = ({left, right, operator}) => {
	let leftString = "Fn";
	let rightString = "Fn";

	try {leftString = toString(left);} catch (_) {}
	try {rightString = toString(right);} catch(_) {}

	throw `Unable to resolve binary operator application (${leftString})${operator}(${rightString})`;
};
const errorUnary = ({value, operator}) => {
	let valueString = "Fn";

	try {valueString = toString(value);} catch (_) {}

	throw `Unable to resolve unary operator application ${operator}(${valueString})`;
};

//----------------------------------------------------------
// Binary

let comma = (left, right) => {
	if (isValue(left) && isUnaryFunction(right)) return right(left);
	if (isValue(left) && isBinaryFunction(right)) return leftApply(left, right);
	if (isBinaryFunction(left) && isUnaryFunction(right)) return x => right(leftApply(x, left));

	errorBinary({left, right, operator: ","});
}; comma.types = [
	["X", ["X", "Y"], "Y"], // applyTo (unary) 3,+1=4
	["X", ["X", "Y", "Z"], ["Y", "Z"]], // applyTo (binary) (3,-)2=1
	[["X", "Y", "Z"], [["Y", "Z"], "W"], ["X", "W"]], // binaryUnaryApply
];
let dot = (left, right) => {
	const typeCombinations = combinations(types(left))(types(right));

	// (XYZ)(ZW)(XYW) binaryUnaryPipe :.+$
	const solutions212 = filter(([leftType, rightType]) => (leftType.length === 3) && (rightType.length === 2) && matchType(leftType[2], rightType[0]))(typeCombinations);
	if (isBinaryFunction(left) && isUnaryFunction(right) && solutions212.length) {
		//let fn = (a, b) => apply(right, apply(apply(a, left), b));
		let fn = (a, b) => right(left(a, b));

		return fn;
	}

	// (XY)(YZW)(XZW) unaryBinaryPipe +1./
	const solutions121 = filter(([leftType, rightType]) => (leftType.length === 2) && (rightType.length === 3) && matchType(leftType[1], rightType[0]))(typeCombinations);
	if (isUnaryFunction(left) && isBinaryFunction(right) && solutions121.length) {
		//let fn = (a, b) => apply(apply(apply(left, a), right), b);
		let fn = (a, b) => right(left(a), b);

		return fn;
	}

	// (XY)(YZ)(XZ) pipe +1./2
	const solutions111 = filter(([leftType, rightType]) => (leftType.length === 2) && (rightType.length === 2) && matchType(leftType[1], rightType[0]))(typeCombinations);
	if (isUnaryFunction(left) && isUnaryFunction(right) && solutions111.length) {
		//let fn = value => apply(right, apply(left, value))
		let fn = value => right(left(value));

		return fn;
	}

	errorBinary({left, right, operator: "."});
}; dot.types = [
	[["X", "Y", "Z"], ["Z", "W"], ["X", "Y", "W"]], // binaryUnaryPipe :.+$
	[["X", "Y"], ["Y", "Z", "W"], ["X", "Z", "W"]], // unaryBinaryPipe +1./
	[["X", "Y"], ["Y", "Z"], ["X", "Z"]], // pipe +1./2
];
let plus = (left, right) => {
	if (isNumber(left) && isValue(right)) { // NVN add 2+"3"
		const castNumber = string => +string || undefined; // remove NaN
		const rightValue = isString(right) ? ((right[0] === "_") ? (castNumber(right.slice(1)) * -1) : castNumber(right)) : right;

		return left + rightValue;
	}

	errorBinary({left, right, operator: "+"});
}; plus.types = [
	["N", "N", "N"], // add 2+3=5
	["N", "S", "N"], // add 0+"3"=3
];
let slash = (left, right) => {
	if (isNumber(left) && isNumber(right)) {
		if (right === 0) return undefined;

		return left / right; // NNN divide 8/2
	}

	errorBinary({left, right, operator: "/"});
}; slash.types = [
	["N", "N", "N"], // divide 8/2=4
];
let less = (left, right) => {
	if ((isNumber(left) && isNumber(right)) || (isString(left) && isString(right)))	return left < right; // NNB SSB lessThan lessThanString 2<3 "abc"<"def"
	if (isUnaryFunction(left) && isArray(right)) return toPairList(sortBy(left)(fromPairList(right))); // // (VS)AA (VN)AA sort ;<("dan" "sue" "alan")

	errorBinary({left, right, operator: "<"});
}; less.types = [
	["N", "N", "B"], // lessThan 2<3
	["S", "S", "B"], // lessThanString "abc"<"bcd"
	[["V", "S"], "A", "A"], // sort ;<("dan" "sue" "alan")
	[["V", "N"], "A", "A"], // sort ;<(1 2 3)
];
let greater = (left, right) => {
	if ((isNumber(left) && isNumber(right)) || (isString(left) && isString(right))) return left > right; // NNB SSB greaterThan greaterThanString 3>2 "bcd">"abc"

	errorBinary({left, right, operator: ">"});
}; greater.types = [
	["N", "N", "B"], // greaterThan 3>2
	["S", "S", "B"], // greaterThanString "bcd">"abc"
];
let minus = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left - right; // NNN subtract 5-2

	errorBinary({left, right, operator: "-"});
}; minus.types = [
	["N", "N", "N"], // subtract 5-2=3
];
let colon = (left, right) => {
	return isArray(left) ? [left, right] : [[undefined, left], right]; // ??P pair +:2@

	errorBinary({left, right, operator: ":"});
}; colon.types = [
	// we make these take values only - allowing : to take functions precludes using colon as an argument in higher-order functions
	["V", "V", "A"], // pair +:2
];
let question = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) {
		return x => isTruthy(left(x)) ? right(x) : undefined;
	}

	errorBinary({left, right, operator: "?"});
}; question.types = [
	[["V", "V"], ["V", "V"], ["V", "V"]], // if <3?+1
];
let atsign = (left, right) => {
	return p => recurse({A: left, B: right, p});

	errorBinary({left, right, operator: "@"});
}; atsign.types = [
	[["V", "X"], ["Y", "X", "Y"], ["A", "Y"]], // reduce ;@+(1:2)=3
];
let asterisk = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left * right; // NNN times 2*3

	errorBinary({left, right, operator: "*"});
}; asterisk.types = [
	["N", "N", "N"], // times 2*3=6
];
let dollar = (left, right) => {
	if (isUnaryFunction(left) && isBinaryFunction(right)) { // S ;$*(2)=4
		// A$Bx = AxBx
		const result = x => {
			// const Ax = apply(left, x);
			// const Bx = apply(right, x);

			// return apply(Bx, Ax);
			return right(left(x), x);
		};

		return result;
	};
	if (isBinaryFunction(left) && isUnaryFunction(right)) { // S (+2./)$;(2)=4
		// A$Bx = xA(Bx)
		const result = x => {
			// const xA = apply(x, left);
			// const Bx = apply(right, x);

			// return apply(xA, Bx);
			return left(x, right(x));
		};

		return result;
	};

	errorBinary({left, right, operator: "$"});
}; dollar.types = [
	[["X", "Y"], ["Y", "X", "Z"], ["X", "Z"]], // S ;$*(2)=4
	[["X", "Y", "Z"], ["X", "Y"], ["X", "Z"]], // S (+2./)$*(2)=4
];
let apostrophe = (left, right) => {
	errorBinary({left, right, operator: "'"});
}; apostrophe.types =[
];
let equal = (left, right) => {
	try {
		return toString(left) === toString(right); // VVB equal 2=4=()
	} catch (_) {
		return undefined;
	}

	errorBinary({left, right, operator: "="});
}; equal.types = [
	["V", "V", "B"], // equals 2=2=!()
];
let bar = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) {
		return x => {
			const first = left(x);

			return isTruthy(first) ? first : right(x);
		}
	}

	errorBinary({left, right, operator: "|"});
}; bar.types = [
	[["V", "V"], ["V", "V"], ["V", "V"]], // orPredicate <5|(>8)
];
let percent = (left, right) => {
	return toPairList(fromPairList(right).slice(-left));

	errorBinary({left, right, operator: "%"});
}; percent.types = [
	["N", "A", "A"], // pop 2%(1:2:3:4)=(1:2)
];
let hat = (left, right) => {
	if (isNumber(left) && isNumber(right)) return Math.pow(left, right); // NNN power 2^3
	if (isUnaryFunction(left) && isNumber(right)) {
		var result = toPairList(map((value, index) => left(index))(Array.from(Array(right)))); // (NV)NA generate ;^3
		return result;
	}
	if (isUnaryFunction(left) && isUnaryFunction(right)) return startingPair => scanInternal({left, right, startingPair}); // scan

	errorBinary({left, right, operator: "^"});
}; hat.types = [
	["N", "N", "N"], // power 2^3
	[["N", "V"], "N", "A"], // generate +1^3
	[["A", "V"], ["A", "V"], ["A", "A"]], // scan
];
let ampersand = (left, right) => {
	errorBinary({left, right, operator: "&"});
}; ampersand.types = [
];
let backtick = (left, right) => {
	return left; // X?X constant 2`3

	errorBinary({left, right, operator: "`"});
}; backtick.types = [
	["X", "V", "X"], // constant 2`3
];

//----------------------------------------------------------
// Unary

let tilde = value => { // not referenced directly when passed number (standard form exported)
	if (isArray(value)) {
		const values = ts.fromPairList(value);
		const array = map(ts.fromPairList, values);

		var newArray = [], origArrayLength = array.length, arrayLength = Math.min.apply(Math, map(array => array.length)(array)), i;

		for(i = 0; i < arrayLength; i++){
			newArray.push([]);
		}
		for(i = 0; i < origArrayLength; i++){
			for(var j = 0; j < arrayLength; j++){
				newArray[j].push(array[i][j]);
			};
		}

		const resultArray = map(ts.toPairList, newArray);
		const resultValues = ts.toPairList(resultArray);

		return resultValues;
	}

	errorUnary({operator: "~", value});
}; 
tilde.types = [
	["A", "A"], // transpose
];
let underscore = value => {
	if (isNumber(value)) return -value; // NN negative _5
	if (isArray(value)) return toPairList(fromPairList(value).reverse());

	errorUnary({operator: "_", value});
}; underscore.types = [
	["N", "N"], // negative _5
	["A", "A"], // reverse _(4:2:6:1)
];
let bracketleft = value => {
	if (isArray(value)) return value[0]; // head P? [("hello":2)="hello"

	errorUnary({operator: "[", value});
}; bracketleft.types = [
	["A", "V"], // first [("hello" 2)="hello"
];
let bracketright = value => {
	if (isArray(value)) return value[value.length - 1]; // tail P? [("hello":2)=2

	errorUnary({operator: "]", value});
}; bracketright.types = [
	["A", "V"], // last ]("hello" 2)=2
];
let backslash = value => {
	errorUnary({value, operator: "\\"});
};
backslash.types = [
];
let braceleft = value => {
	errorUnary({operator: "{", value});
}; braceleft.types = [
];
let semicolon = value => {
	return value; // identiy XX ;1=1

	errorUnary({operator: ";", value});
}; semicolon.types = [
	["X", "X"], // identity ;1=1
];
let braceright = value => {
	errorUnary({operator: "}", value});
}; braceright.types = [
];
let bang = value => {
	errorUnary({value, operator: "!"});
}; bang.types = [
];
let hash = value => {
	const lengthIter = (pair, acc) => {
		if (!isArray(pair)) return acc;

		return () => lengthIter(pair[0], acc + 1);
	};

	return trampoline(() => lengthIter(value, 0));

	errorUnary({value, operator: "#"});
}; hash.types = [
	["A", "N"], // length
];

//==========================================================
// main exports

const ts = {
	arity,
	apply,
	typeOf,
	toString,
	toPairList,
	fromPairList,

	plus,
	tilde,
	underscore,
	bracketleft,
	bracketright,
	slash,
	hash,
	less,
	dot,
	minus,
	colon,
	backslash,
	question,
	atsign,
	asterisk,
	dollar,
	backtick,
	braceleft,
	apostrophe,
	semicolon,
	comma,
	equal,
	bar,
	percent,
	braceright,
	hat,
	ampersand,
	greater,
	bang,
};

export default ts;