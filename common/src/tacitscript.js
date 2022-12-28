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
	if (isObject(value)) return ["D"];
	if (isBoolean(value)) return ["B"];
	//if (isFunction(value)) return arity(value);

	if (isFunction(value)) return value.types || (contains(value.length)([0, 1]) ? [["V", "V"]] : [["V", "V", "V"]]); // assume referenced js functions and not higher order

//	return [[0]];
};

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
	if ("XYZWU".includes(acceptorSymbol)) return [[acceptorSymbol, donorSymbol]];

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
		filter(symbols => (symbols.length === 1) && "XYZWU".includes(symbols[0])),
		map(([symbol]) => [symbol, "?"])
	)(typeSymbols);

	return reduceType({type: reducedType, typeMap: reductionMap});
};
const getReducedUnaryType = ({leftType, rightType}) => getReducedType({remainderType: leftType[1], typeMap: getTypeMap(leftType[0], rightType)});
const getReducedLeftAppliedType = ({leftType, rightType}) => getReducedType({remainderType: rightType.slice(1), typeMap: getTypeMap(rightType[0], leftType)});
const getReducedRightAppliedType = ({leftType, rightType}) => getReducedType({remainderType: splice(leftType, 1, 1), typeMap: getTypeMap(leftType[1], rightType)});
const matchSymbol = (left, right) => {
	return (left === right) ||
		"XYZWU?".includes(left) ||
		"XYZWU?".includes(right) ||
		any(([source, match]) => (source === "V") && !Array.isArray(match))([[left, right], [right, left]]);
};
const matchType = (left, right) => {
	const match = matchSymbol(left, right) ||
		(Array.isArray(left) && Array.isArray(right) && (left.length === right.length) && left.map((value, index) => matchType(value, right[index])).reduce((acc, value) => acc && value, true) && pipe( // match fields which have to be the same from other specification
			map(([source, match]) => all(symbol => {
				const matchIndices = source.reduce((acc, sourceSymbol, index) => (symbol === sourceSymbol) ? [...acc, index] : acc, []);

				return matchIndices.length ? all(index => matchType(match[index], match[matchIndices[0]]))(matchIndices) : true;
			})(["X", "Y", "Z", "W", "U"])),
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
	if (isObject(value)) return "D";
	if (isBoolean(value)) return "B";
	if (isFunction(value)) return arity(value);

	throw `Unknown type of value: ${value}`;
};
const toEncodedString = value => {
	if (isString(value)) return `"${value}"`;

	return toString(value);
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
const scanInternal = ({left, right, startingArray}) => {
	let result = [...startingArray];

	while (isTruthy(left(result))) result.push(right(result));

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

const comma = (left, right) => {
	if (isValue(left) && isUnaryFunction(right)) return right(left);										// X(XY)X				applyToUnary		3,+1=4
	if (isValue(left) && isBinaryFunction(right)) return leftApply(left, right);							// X(XYZ)(YZ)			applyToBinary		(1,/)2=0.5
	if (isBinaryFunction(left) && isUnaryFunction(right)) return x => right(leftApply(x, left));			// (XYZ)((YZ)W)(XW)		binaryUnaryApply	(+,^3)1=(1 2 3)
	if (isBinaryFunction(left) && isBinaryFunction(right)) return (x, y) => right(leftApply(x, left), y);	// (XYZ)((YZ)WU)(XWU)	binaryBinaryApply	1(+,^)3=(1 2 3)

	errorBinary({left, right, operator: ","});
};
const dot = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) return value => right(left(value));				// (XY)(YZ)(XZ)			pipe				(+1./2)5=3
	if (isUnaryFunction(left) && isBinaryFunction(right)) return (a, b) => right(left(a), b);				// (XY)(YZW)(XZW)		unaryBinaryPipe		7(+1./)4=2
	if (isBinaryFunction(left) && isUnaryFunction(right)) return  (a, b) => right(left(a, b));				// (XYZ)(ZW)(XYW)		binaryUnaryPipe		3(:.+@)4=7

	errorBinary({left, right, operator: "."});
};
let plus = (left, right) => {
	if (isString(left) && isValue(right)) {																	// SVS					stringConcat		"High"+5="High5"
		try {
			return `${left}${toString(right)}`; 
		} catch (_) {
			return undefined;
		}
	}
	if (isNumber(left) && isNumber(right)) return left + right;												// NNN					add					2+3=5
	if (isNumber(left) && isString(right)) {																// NSN					parseNumber			2+"3"=5
		const rightValue = (right[0] === "_") ? (+right.slice(1) * -1) : +right;

		return left + rightValue;
	}
	if (isArray(left) && isArray(right)) return [...left, ...right];										// AAA					arrayConcat			(1 2 3)+(4 5 6)=(1 2 3 4 5 6)
	if (isObject(left) && isObject(right)) return  mergeDeep(left, right);									// DDD					merge				\(("a" 1) ("b" 2))+(\(("b" 3))=\(("a" 1) ("b" 3))

	errorBinary({left, right, operator: "+"});
};
let slash = (left, right) => {
	if (isNumber(left) && isNumber(right)) {																// NNN					divide				6/2=3
		if (right === 0) return undefined;

		return left / right;
	}

	errorBinary({left, right, operator: "/"});
};
let less = (left, right) => {
	if ((isNumber(left) && isNumber(right)) || (isString(left) && isString(right)))	return left < right; 	// NNB SSB				lessThan			3<2=() "abc"<"def"=(!())
	if (isUnaryFunction(left) && isArray(right)) return sortBy(left)(right); 								// (VS)AA (VN)AA		sort				;<("dan" "sue" "alan")=("alan" "dan" "sue") ;<(2 3 1)=(1 2 3)

	errorBinary({left, right, operator: "<"});
};
let greater = (left, right) => {
	if ((isNumber(left) && isNumber(right)) || (isString(left) && isString(right))) return left > right;	// NNB SSB				greaterThan			3>2=!() "abc">"def"=()
	if (isUnaryFunction(left) && isArray(right)) {															// (VV)A(AA) (VV)A(DD)	over				+1>(1 )(3 5 7)=(3 6 7) +1>("a" )(\(("a" 2) ))=(`(("a" 3) ))
		return x => applyOver({path: right, fn: left, container: x});
	}
	if (isValue(left) && isUnaryFunction(right)) {															// X(XV)X				tap					3>({"console.log")
		try {
			right(left);
		} catch (_) {
		}

		return left;
	}

	errorBinary({left, right, operator: ">"});
};
let minus = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left - right;												// NNN					subtract			5-2=3
	if (isArray(left) && isArray(right)) return splice(right, ...left); 									// AAA					splice				(1 2 3 4)-(5 6 7 8)=(5 3 4 8)
	if (isArray(left) && isString(right))
		return right.substring(0, left[0]) + (left[2] || "") + right.substring(left[0] + left[1]);			// ASS					splice				(3 2 "le")-"nucular"="nuclear"
	if (isString(left) && isObject(right)) {																// SDD					omitKey				"a"-(\(("a" 1) ("b" 2)))=(\(("b" 2) ))
		const {[left]: deletedKey, ...remainder} = right;

		return remainder;
	}
	if (isArray(left) && isObject(right)) {																	// ADD					omitKeys			("a" )-(\(("a" 1) ("b" 2)))=(\(("b" 2) ))
		return omit(left)(right);
	}
	if (isString(left) && isString(right)) return string => string.replaceAll(left, right);					// SS(SS)				stringReplace		"_"-"-""1 0 _1"="1 0 -1"

	errorBinary({left, right, operator: "-"});
};
let colon = (left, right) => {
	return [left, right];																					// VVA					pair				1:"string"=(1 "string")

	errorBinary({left, right, operator: ":"});
};
let question = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) {													// (XB)(XY)(XY)			if					<3?(+1)1=2
		return x => isTruthy(left(x)) ? right(x) : undefined;
	}
	if (isNumber(left) && isNumber(right)) {																// NNN					random				0?100=[0:100)
		return (Math.random() * (right - left)) + left;
	}
	if (isUnaryFunction(left) && isArray(right)) return tsFilter(left)(right);								// (VB)AA				filter				<5?(4 9 2 7 3)=(4 2 3)

	errorBinary({left, right, operator: "?"});
};
let atsign = (left, right) => {																				// (VVX)AX				accumulate			+@(1 2)=3
	if (isBinaryFunction(left) && isArray(right))
		return right.slice(1).reduce((acc, value) => left(acc, value), right[0]);
	if (isUnaryFunction(left) && isArray(right)) {															// (VB)AN				findIndex			(%2.=0)@(1 2 3 4)=1
		const index = right.findIndex(left);

		return (index === -1) ? undefined : index;
	}
	if (isValue(left) && isArray(right)) {																	// VAN					indexOf				2@(6 8 2 3)=2
		try {
			const leftString = toString(left);
			const leftType = typeOf(left);
			const index = right.findIndex(value => (leftType === typeOf(value)) &&
				(leftString === toString(value)));

			return (index === -1) ? undefined : index;
		} catch (_) {
			return undefined;
		}
	}
	if (isString(left) && isString(right))																	// SSN					indexOf				"bc"@"abcd"=1
		return (index => (index === -1) ? undefined : index)(right.indexOf(left));

	errorBinary({left, right, operator: "@"});
};
let asterisk = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left * right;												// NNN					times				2*3=6

	errorBinary({left, right, operator: "*"});
};
let dollar = (left, right) => {
	// A$Bx = xA(Bx)
	if (isBinaryFunction(left) && isUnaryFunction(right)) return x => left(x, right(x));					// (XYZ)(XY)(XZ)		fork				(+2./)$;(2)=2
	if (isString(left) && isArray(right)) {																	// SAS					join				","$(1 2 3)
		try {
			return pipe(map(toString), join(left))(right);
		} catch (_) {
			return undefined;
		}
	}
	if (isArray(left) && isValue(right)) return [...left, right];											// AVA					append				(1 2)$3=(1 2 3)

	errorBinary({left, right, operator: "$"});
};
let apostrophe = (left, right) => {
	if (isNumber(left) && isNumber(right)) {																// NNN					round				2'3.176=3.18
		const factor = Math.pow(10, left);

		return Math.round(right * factor) / factor;
	}
	if (isNumber(left) && (isArray(right) || isString(right)))												// NAV NSS				at					1'(1 2 3)=2 1'"abc"="b"
		return (left >= 0) ? right[left] : right[right.length + left];
	if (isString(left) && isObject(right)) return right[left];												// SDV					prop				"a"'(\(("a" 1) ))=1
	if (isArray(left) && (isArray(right) || isObject(right))) return path(left)(right);						// AAV ADV				path				(1 )'(5 6 7)=6 ("a" )'(\(("a" 1) ))=1
	if (isUnaryFunction(left) && isArray(right)) return tsFind(left)(right);								// (VB)AV				find				(%2.=0)'(1 2 3)=2

	errorBinary({left, right, operator: "'"});
};
let equal = (left, right) => {
	if (!isValue(left) || !isValue(right)) errorBinary({left, right, operator: "="});

	try {
		return (typeOf(left) === typeOf(right)) && (toString(left) === toString(right));					// XXB					equals				2=4=()
	} catch (_) {
		return undefined;
	}

	errorBinary({left, right, operator: "="});
};
let bar = (left, right) => {
	if (isValue(left) && isValue(right)) return isFalsey(left) ? right : left;								// VVV					orValue				()|1=1
	if (isUnaryFunction(left) && isUnaryFunction(right)) {													// (XY)(XY)(XY)			orPredicate			>0|(%2.=0)(_2)=(!())
		let fn = x => {
			const leftResult = left(x);

			return isFalsey(leftResult) ? right(x) : leftResult;
		};

		return fn;
	}
	if (isBinaryFunction(left) && isBinaryFunction(right)) {												// (XYZ)(XYZ)(XYZ)		orComparator		3(<|=)2=()
		let fn = (x, y) => {
			const leftResult = left(x, y);

			return isFalsey(leftResult) ? right(x, y) : leftResult;
		};

		return fn;
	}

	errorBinary({left, right, operator: "|"});
};
let percent = (left, right) => {
	if (isNumber(left)) {
		if (isNumber(right)) return (right === 0) ? undefined : (left % right);								// 000		NNN					remainder			7%2=1
		else if (isArray(right) || isString(right)) return [right.slice(0, left), right.slice(left)];		// 000		NAA NSA				split				2%(1 2 3 4 5)=((1 2) (3 4 5)) 2%"abcde"=("ab" "cde")
	}
	else if (isArray(left)) {
		if (isArray(right)) return chunk({sizes: left, vector: right, newVector: []});						// 000		AAA					chunk				(1 2 0)%(1 2 3 4 5)=((1 ) (2 3) (4 5))
		else if (isString(right)) return chunk({sizes: left, vector: right.split(""), newVector: ""});		// 000		ASA					chunk				(1 2 0)%"abcde"=("a" "bc" "de")
		else if (isObject(right)) return pick(left)(right);													// 000		ADD					pick				("a" "c" "d")%(\(("a" 1) ("b" 2) ("c" 3)))=(\(("a" 1) ("c" 3)))
	}
	else if (isString(left) && isString(right)) {															// 000		SSA					chunkWithDelimiter	", "%"1, 2, 3, 4"=("1" "2" "3" "4")
		return right.split(left);
	}
	else if (isUnaryFunction(left) && isArray(right)) {														// 100		(VV)AD				groupBy				[%("ann" "ben" "ade")=(\(("a" ("ann" "ade")) ("b" ("ben" ))))
		return reduce((acc, value) => {
			const key = left(value);
			
			return (acc[key] == undefined) ? {...acc, [key]: [value]} :
				{...acc, [key]: [...acc[key], value]};
		})({})(right);
	}
	else if (isBinaryFunction(left)) {
		if (isArray(right)) return chunkWhenComparator({when: left, vector: right, newVector: []});			// 200		(VVB)AA				chunkWhenComparator	<%(1 2 3 2 1)=((1 ) (2 ) (3 2 1))
		else if (isString(right))																			// 200		(SSB)SA				chunkWhenComparator <%"abcba"=("a" "b" "cba")
			return chunkWhenComparator({when: left, vector: right.split(""), newVector: ""});
	}

	errorBinary({left, right, operator: "%"});
};
let hat = (left, right) => {
	if (isNumber(left) && isNumber(right)) return Math.pow(left, right);									// 000		NNN					power				2^3=8
	if (isUnaryFunction(left) && isNumber(right))															// 100		(NV)NA				generate			;^3=(0 1 2)
		return map((value, index) => left(index))(Array.from(Array(right)));
	if (isUnaryFunction(left) && isUnaryFunction(right))													// 111		(AV)(AV)(AA)		scan				#.<3^#( )=(0 1 2)
		return array => scanInternal({left, right, startingArray: array});
	//if (isUnaryFunction(left) && isArray(right)) return lazyScan({next: left, start: right}); // (AV)AL lazyScan (#.+1)^( )

	errorBinary({left, right, operator: "^"});
};
let ampersand = (left, right) => {
	if (isValue(left) && isValue(right)) return isTruthy(left) ? right : left;								// 000		VVV					andValue			!()&2=2
	if (isUnaryFunction(left) && isUnaryFunction(right)) {													// 111		(VV)(VV)(VV)		andPredicate		>2&(<6)(3)=(!())
		let result = value => {
			const leftValue = comma(value, left);

			return isTruthy(leftValue) ? comma(value, right) : leftValue;
		}

		result.types = types(left); // TODO: edge cases abound here

		return result;
	}

	const applyLeft = value => left(value);

	if (isUnaryFunction(left) && isArray(right)) return map(applyLeft)(right);								// 100		(VV)AA				map					*2&(2 3 4)=(4 6 8)
	if (isUnaryFunction(left) && isObject(right)) return mapObj(applyLeft)(right);							// 100		(VV)DD				mapObject			*2&(\(("a" 3) ))=(\(("a" 6) ))

	errorBinary({left, right, operator: "&"});
};
let backtick = (left, right) => {
	return left;																							// 000		XVX					constant			2`3=2

	errorBinary({left, right, operator: "`"});
};

//----------------------------------------------------------
// Unary

let tilde = value => {
	if (isBinaryFunction(value)) return (x, y) => value(y, x);												// 22		(XYZ)(YXZ)			flip				2(~/)1=0.5
	if (isArray(value)) return transpose(value);															// 00		AA					transpose			~((1 2) (3 4))=((1 3) (2 4))

	errorUnary({operator: "~", value});
}; 
let underscore = value => { // not referenced in number literal (standard form exported)
	if (isNumber(value)) return -value;																		// 00		NN					negative			_5
	if (isArray(value)) return value.slice(0).reverse();													// 00		AA					reverse				_(1 2 3)=(3 2 1)
	if (isString(value)) return value.split("").reverse().join("");											// 00		SS					reverse				_"Hello"="olleH"

	errorUnary({operator: "_", value});
};
let bracketleft = value => {
	if (isVector(value)) return value[0];																	// 00		AV SS				first				[(1 2 3)=1 ["abc"="a"
	if (isNumber(value)) return Math.floor(value);															// 00		NN					floor				[1.8=1

	errorUnary({operator: "[", value});
};
let bracketright = value => {
	if (isVector(value)) return value[value.length - 1];													// 00		AV SS				last				](1 2 3)=3 ]"abc"="c"
	if (isNumber(value)) return Math.ceil(value);															// 00		NN					ceiling				]1.2=2

	errorUnary({operator: "]", value});
};
let backslash = value => {
	if (isArray(value)) return Object.fromEntries(value);													// 00		AD					fromPairs			\(("a" 1) ("b" 2))
	if (isObject(value)) return Object.entries(value);														// 00		DA					toPairs				\(\(("a" 1) ("b" 2)))

	errorUnary({value, operator: "\\"});
};
let braceleft = value => {
	if (isArray(value))																						// 00		AA					unnest				{(1 (2 3))=(1 2 3)
		return reduce((acc, value) => [...acc, ...(isArray(value) ? value : [value])])([])(value);
	// should never be referenced directly for literal evaluation - expanded in parser
	//if (isString(value)) return eval(ts2es6(value));														// 0?		S?					eval				{"Math.sqrt(2)"
	//if (isStream(value)) return [...value()];

	errorUnary({operator: "{", value});
};
let semicolon = value => {
	return value;																							// VV					identity				;1=1

	errorUnary({operator: ";", value});
};
let braceright = value => {
	return typeOf(value);																					// ?0		?S					typeof				}3="N"

	errorUnary({operator: "}", value});
};
let bang = value => {
	if (isValue(value)) return isFalsey(value);																// 00		VB					notValue			!3=()
	if (isUnaryFunction(value)) {																			// 11		(VV)(VB)			notPredicate		!(<2)(1)=()
		let fn = x => isFalsey(value(x));

		fn.types = value.types;

		return fn;
	}
	if (isBinaryFunction(value)) {																			// 22		(VVV)(VVB)			notComparator		3(!<)4=()
		let fn = (x, y) => isFalsey(value(x, y));

		fn.types = value.types;

		return fn;
	}

	errorUnary({value, operator: "!"});
};
let hash = value => {
	if (isVector(value)) return value.length;																// 00		SN AN				length				#"abcd"=4 #(4 5 6)=3
	if (isObject(value)) return Object.keys(value).length;													// 00		DN					keyLength			#(\(("a" 1) ))=1
	if (isNumber(value)) return Math.abs(value);															// 00		NN					modulus				#(_1.5)=1.5

	errorUnary({value, operator: "#"});
};

//==========================================================
// main exports

const ts = {
	arity,
	apply,
	typeOf,
	toString,
	leftApply,
	rightApply,

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