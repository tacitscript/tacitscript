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
const sortBy = fn => array => array.sort((a, b) => {const valA = fn(a), valB = fn(b); return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;});
const last = array => array[array.length - 1];
const combinations = array1 => array2 => unnest(map(value1 => map(value2 => [value1, value2])(array2))(array1));
const unnest = reduce((acc, array) => [...acc, ...array])([]);
const splice = (array, start, deleteCount, ...items) => {const copy = array.slice(0); copy.splice(start, deleteCount, ...items); return copy;};
const omit = keys => object => {const copy = {...object}; keys.forEach(key => delete copy[key]); return copy;};
const path = array => obj => reduce((acc, index) => acc && acc[index])(obj)(array);
const all = check => array => array.every(check);
const flatten = reduce((acc, value) => [...acc, ...(Array.isArray(value) ? flatten(value) : [value])])([]);
const groupBy = fn => reduce((acc, value) => {const key = fn(value); return (acc[key] == undefined) ? {...acc, [key]: [value]} : {...acc, [key]: [...acc[key], value]};})({});
const identity = x => x;
const values = obj => Object.values(obj);
const any = check => array => array.some(check);
const take = number => array => array.slice(0, number);
const append = value => array => [...array, value];
const prepend = value => array => [value, ...array];
const first = array => array[0];

//==========================================================
// ts functional utilities using ts logic (falsey is only undefined or false)

const tsPredicate = fn => tsPredicate => {const predicate = value => {const result = tsPredicate(value); return isTruthy(result);}; return fn(predicate);};
const tsFilter = tsPredicate(filter);
const tsFind = tsPredicate(find);

//==========================================================
// type utilites

const isUndefined = value => value == undefined;
const isString = value => typeof value === "string";
const isNumber = value => typeof value === "number";
const isFunction = value => typeof value === "function";
const isArray = value => Array.isArray(value);
const isObject = value => (typeof value === 'object') && !isArray(value);
const isBoolean = value => typeof value === "boolean";
const isTruthy = value => (value != undefined) && (value !== false);
const isFalsey = value => (value == undefined) || (value === false);
const arity = value => {
	if (!isFunction(value)) return 0;

	if (value.length < 1) return 1;
	if (value.length > 2) return 2;

	return value.length;
};
const isBinaryFunction = value => arity(value) === 2;
const isUnaryFunction = value => arity(value) === 1;
const isValue = value => arity(value) === 0;
const types = value => {
	if (value == undefined) return [undefined];
	if (isArray(value)) return ["A"];
	if (isString(value)) return ["S"];
	if (isNumber(value)) return ["N"];
	if (isObject(value)) return ["O"];
	if (isBoolean(value)) return ["B"];
	//if (isFunction(value)) return arity(value);

	if (isFunction(value)) return value.types || [contains(value.length)([0, 1]) ? ["V", "V"] : ["V", "V", "V"]]; // assume referenced js functions and not higher order

//	return [[0]];
};
const supportsUndefined = value => isFunction(value) && value.supportsUndefined;


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
	if ((left == undefined) && !supportsUndefined(right)) return undefined;
	if ((right == undefined) && !supportsUndefined(left)) return undefined;

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

			if (right.supportsUndefined) result.supportsUndefined = true;
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

			if (left.supportsUndefined) result.supportsUndefined = true;
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

	throw `Unable to resolve dynamic function application: ${JSON.stringify({left, right})}`;
};
const typeOf = value => {
	if (isArray(value)) return "A";
	if (isString(value)) return "S";
	if (isNumber(value)) return "N";
	if (isObject(value)) return "O";
	if (isBoolean(value)) return "B";
	if (isFunction(value)) return arity(value);
	if (value == undefined) return "U";

	throw `Unknown type of value: ${value}`;
};
const toEncodedString = value => {
	if (isString(value)) return `"${value}"`;

	return toString(value);
};
const toString = value => {
	if (value == undefined) return "undefined";
	if (value === false) return "()";
	if (value === true) return "!()";
	if (isNumber(value)) return `${value}`;
	if (isString(value)) return value;
	if (isArray(value)) return `(${pipe(map(value => toEncodedString(value)), join(" "))(value)}${(value.length < 2) ? " " : ""})`;
	if (isObject(value)) return `(\\${toString(Object.entries(value, true))})`;

	throw `Unable to stringify value: ${value}`;
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
const chunk = ({sizes, vector, newVector, append}) => pipe(
	reduce((acc, value) => {
		const lastLength = last(acc).length;
		const index = acc.length - 1;
		const lastFinalLength = sizes[index % sizes.length] || Infinity;

		if (lastLength < (lastFinalLength - 1)) return [...acc.slice(0, -1), append(acc[index], value)];
		else if (lastLength === (lastFinalLength - 1)) return [...acc.slice(0, -1), append(acc[index], value), []];
		else return [...acc, [value]]; // lastFinalLength was 0
	})([newVector]),
	chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
)(vector);
const chunkWhen = ({when, vector, newVector, append}) => pipe(
	reduce((acc, value) => {
		const lastArray = last(acc);

		if ((lastArray.length < 1) || !when(last(lastArray), value)) return [...acc.slice(0, -1), append(lastArray, value)];
		else return [...acc, [value]];
	})([newVector]),
	chunks => last(chunks).length ? chunks : chunks.slice(0, -1)
)(vector);
const leftApply = (left, binaryFn) => right => binaryFn(left, right);
const rightApply = (binaryFn, right) => left => binaryFn(left, right);
const whileInternal = ({fns, startingArray}) => {
	let result = [...startingArray];

	while (isTruthy(fns[0](result))) result.push(fns[1](result));

	return result;
};

//==========================================================
// OPERATORS

//----------------------------------------------------------
// Binary

let comma = (left, right) => {
	if (isUndefined(left) || isUndefined(right)) return undefined;

	const typeCombinations = combinations(types(left))(types(right));

	if (isArray(right)) {
		// AAA zipApplyTo (3 4),(+1 +)
		if (isArray(left)) {
			return pipe(
				transpose,
				map(([leftValue, rightValue]) => comma(leftValue, rightValue)),
			)([left, right])
		}

		// (XA)A(XA) unaryZipApplyTo +1@,(*2 /2)
		if (isUnaryFunction(left)) {
			let fn = x => comma(left(x), right);
			fn.types = combinations(map(first)(types(left)))(["A"]);

			return fn;
		}

		// (XYA)A(XYA) binaryZipApplyTo :,(+1 -1)
		if (isBinaryFunction(left)) { // 202
			let fn = (x, y) => comma(left(x, y), right);
			fn.types = map(pipe(take(2), append("A")))(types(left));

			return fn;
		}
	} else {
		// X(XY)Y applyTo 3,+1
		const solutionsInvert = filter(([leftType, rightType]) => (rightType.length === 2) && matchType(rightType[0], leftType))(typeCombinations);
		if (isUnaryFunction(right) && solutionsInvert.length) {
			let result = right(left); // apply(right, left);

			if (isFunction(result)) result.types = pipe(
				map(([leftType, rightType]) => rightType[1]),
				filter(Array.isArray)
			)(solutionsInvert);

			return result;
		}

		// X(XYZ)(YZ) applyToBinary 3,+
		const solutions021 = filter(([leftType, rightType]) => !Array.isArray(leftType) && (rightType.length === 3) && matchType(leftType, rightType[0]))(typeCombinations);
		if (isValue(left) && isBinaryFunction(right) && solutions021.length) {
			let fn = value => leftApply(left, right)(value);

			fn.types = map(([leftType, rightType]) => rightType.slice(1))(solutions021);

			return fn;
		}
	}

	throw `Unable to resolve application of operator , with arguments: ${JSON.stringify({left, right})}`;
}; comma.types = [
	["A", "A", "A"], // zipApplyTo (3 4),(+1 +)
	[["X", "A"], "A", ["X", "A"]], // unaryZipApplyTo +1@,(*2 /2)
	[["X", "Y", "A"], "A", ["X", "Y", "A"]], // binaryZipApplyTo :,(+1 -1)
	["X", ["X", "Y"], "Y"], // applyTo 3,+1
	["X", ["X", "Y", "Z"], ["Y", "Z"]], // applyToBinary 3,+
];
let dot = (left, right) => {
	if (isUndefined(left) || isUndefined(right)) return undefined;

	const typeCombinations = combinations(types(left))(types(right));

	if (isArray(right)) {
		// VAA applyToArray (1 2 3).(# ])
		const solutions000 = filter(([leftType, rightType]) => (rightType === "A") && !Array.isArray(leftType))(typeCombinations);
		if (isValue(left) && solutions000.length) {
			return map(value => comma(left, value))(right);
		}

		// (VV)A(VA) pipeToArray [.(+1 -2)
		const solutions101 = filter(([leftType, rightType]) => (rightType === "A") && (leftType.length === 2))(typeCombinations);
		if (isUnaryFunction(left) && solutions101.length) {
			let fn = x => map(value => comma(left(x), value))(right);

			fn.types = map(([leftType]) => [leftType[0], "A"])(solutions101);

			return fn;
		}

		// (VVV)A(VVA) pipeBinaryToArray :.(+$ -$)
		const solutions202 = filter(([leftType, rightType]) => (rightType === "A") && (leftType.length === 3))(typeCombinations);
		if (isBinaryFunction(left) && solutions202.length) {
			let fn = (x, y) => map(value => comma(left(x, y), value))(right);

			fn.types = map(([leftType]) => [...leftType.slice(0, 2), "A"])(solutions202);

			return fn;
		}
	} else {
		// (XYZ)(ZW)(XYW) binaryUnaryPipe :.+$
		const solutions212 = filter(([leftType, rightType]) => (leftType.length === 3) && (rightType.length === 2) && matchType(leftType[2], rightType[0]))(typeCombinations);
		if (isBinaryFunction(left) && isUnaryFunction(right) && solutions212.length) { 
			let fn = (a, b) => right(left(a, b));

			fn.types = map(([leftType, rightType]) => [...leftType.slice(0, 2), rightType[1]])(solutions212);

			return fn;
		}

		// (XYZ)((YZ)W)(XW) binaryUnaryApply =.'(1 2 3)
		const solutions211 = filter(([leftType, rightType]) => (leftType.length === 3) && (rightType.length === 2) && matchType(leftType.slice(1), rightType[0]))(typeCombinations);
		if (isBinaryFunction(left) && isUnaryFunction(right) && solutions211.length) { 
			let fn = x => right(leftApply(x, left));

			fn.types = map(([leftType, rightType]) => [leftType[1], rightType[1]])(solutions211);

			return fn;
		}		

		// (XY)(YZW)(X(ZW)) unaryBinaryPipe +1./
		const solutions121 = filter(([leftType, rightType]) => (leftType.length === 2) && (rightType.length === 3) && matchType(leftType[1], rightType[0]))(typeCombinations);
		if (isUnaryFunction(left) && isBinaryFunction(right) && solutions121.length) {
			let fn = value => leftApply(left(value), right);

			fn.types = map(([leftType, rightType]) => [leftType[0], rightType.slice(1)])(solutions121);

			return fn;
		}

		// (XY)((XY)ZW)(ZW) unaryBinaryApply =1.?
		const solutions121a = filter(([leftType, rightType]) => (leftType.length === 2) && (rightType.length === 3) && matchType(leftType, rightType[0]))(typeCombinations);
		if (isUnaryFunction(left) && isBinaryFunction(right) && solutions121a.length) {
			let result = x => right(left, x);

			result.types = map(([leftType, rightType]) => rightType.slice(1))(solutions121a);

			return result;
		}

		// (XY)(YZ)(XZ) pipe +1./2
		const solutions111 = filter(([leftType, rightType]) => (leftType.length === 2) && (rightType.length === 2) && matchType(leftType[1], rightType[0]))(typeCombinations);
		if (isUnaryFunction(left) && isUnaryFunction(right) && solutions111.length) {
			let fn = value => right(left(value));

			fn.types = map(([leftType, rightType]) => [leftType[0], rightType[1]])(solutions111);

			return fn;
		}
	}

	throw `Unable to resolve application of operator . with arguments: ${JSON.stringify({left, right})}`;
}; dot.types = [
	["V", "A", "A"], // applyToArray (1 2 3).(# ])
	[["V", "V"], "A", ["V", "A"]], // pipeToArray [.(+1 -2) -- OLD (??)A(?A)
	[["V", "V", "V"], "A", ["V", "V", "A"]], // pipeBinaryToArray :.(+$ -$) -- OLD (???)A(??A)
	[["X", "Y", "Z"], ["Z", "W"], ["X", "Y", "W"]], // binaryUnaryPipe :.+$
	[["X", "Y", "Z"], [["Y", "Z"], "W"], ["X", "W"]], // binaryUnaryApply =.'(1 2 3)
	[["X", "Y"], ["Y", "Z", "W"], ["X", ["Z", "W"]]], // unaryBinaryPipe +1./
	[["X", "Y"], [["X", "Y"], "Z", "W"], ["Z", "W"]], // unaryBinaryApply =1.?
	[["X", "Y"], ["Y", "Z"], ["X", "Z"]], // pipe +1./2
];
let plus = (left, right) => {
	if (typeof left === "string") return `${left}${toString(right)}`; // SVS stringConcat ""+4
	if (Array.isArray(left)) return [...left, ...right]; // AAA arrayConcat (1 2 3)+(4 5 6)
	if (isObject(left)) return  mergeDeep(left, right); // OOO merge {"{a: 1}"+({"{b: 2}")

	return left + right; // NNN add 2+3
}; plus.types = [
	["N", "N", "N"], // add 2+3
	["S", "V", "S"], // stringConcat ""+4
	["A", "A", "A"], // arrayConcat (1 2 3)+(4 5 6)
	["O", "O", "O"], // merge {"{a: 1}"+({"{b: 2}")
];
let slash = (left, right) => {
	//if (isUnaryFunction(left) && isArray(right)) return reduce((acc, value) => {const key = toString(left(value)); return (acc[key] == undefined) ? {...acc, [key]: [value]} : {...acc, [key]: [...acc[key], value]};})({})(right); // groupBy

	if (right === 0) return undefined;

	return left / right;
}; slash.types = [["N", "N", "N"]/*, [["?", "V"], "A", "O"]*/];
let less = (left, right) => {
	if (isFunction(left) && isArray(right)) return sortBy(left)(right);

	return left < right;
}; less.types = [["N", "N", "B"], ["S", "S", "B"], [["?", "?"], "A", "A"]];
let greater = (left, right) => {
	return left > right;
}; greater.types = [["N", "N", "B"], ["S", "S", "B"]];
let minus = (left, right) => {
	if (isString(left) && isObject(right)) { // omitKey
		const {[left]: deletedKey, ...remainder} = right;

		return remainder;
	}
	if (isArray(left) && isObject(right)) { // omitKeys
		return omit(left)(right);
	}

	return left - right; // minus
}; minus.types = [["N", "N", "N"], ["S", "O", "O"], ["A", "O", "O"]];
let colon = (left, right) => {
	return [left, right]; // ??A pair +:2
}; 
colon.types = [
	["?", "?", "A"], // pair +:2
];
let question = (left, right) => {
	if (isFunction(left)) { // (VB)VA if <3?2
		// const result = apply(left, right);
		const result = left(right); // AVA  cond (<10 <20)?15

		return isFalsey(result) ? [undefined, right] : [right, undefined];
	}

	if (isArray(left)) { // AVA cond (<10 <20)?15
		const output = Array.from(Array(left.length + 1));
		let i = 0;

		for (; i < left.length; ++i) {
			const result = left[i](right);

			if (isTruthy(result)) {
				output[i] = right;
				break;
			}
		}

		if (i === left.length) output[i] = right;

		return output;
	}

	throw `Unable to resolve application of operator ? with arguments: ${JSON.stringify({left, right})}`;
}; question.types = [
	[["V", "B"], "V", "A"], // if <3?2
	["A", "V", "A"], // cond (<10 <20)?15
];
let atsign = (left, right) => {
	const applyLeft = value => comma(value, left); // apply(left, value);
	// const applyIndexedLeft = (value, index) => apply((() => {let fn = val => left(val, index); if (left.types) fn.types = map(type => splice(type, 1, 1))(left.types); return fn;})(), value);
	//const applyIndexedLeft = (value, index) => comma(value, (() => {let fn = val => left(val, index); if (left.types) fn.types = map(type => splice(type, 1, 1))(left.types); return fn;})());

	/*
	if (isObject(right)) {
		if (isUnaryFunction(left)) return mapObj(applyLeft)(right); // (VV)OO
		if (isBinaryFunction(left)) return mapObjIndexed(applyIndexedLeft)(right); // (VSV)OO
	}
	*/

	// (VV)AA map *2@(3 4 5)
	// (VVV)AA mapBinary =@(2 3 4)
	return map(applyLeft)(right);
}; atsign.types = [
	[["V", "V"], "A", "A"], // map *2@(3 4 5)
	[["V", "V", "V"], "A", "A"], // mapBinary =@(2 3 4)
	//[["V", "V"], "O", "O"], // mapObject *2@({"{a: 1, b: 2, c: 3}")
	//[["V", "S", "V"], "O", "O"] // mapObjectIndexed 
];
let asterisk = (left, right) => {
	if (isFunction(left)) return tsFilter(left)(right); // (VB)AA filter <5*(4 9 2 7 3)
	if (Array.isArray(left)) { // AOO pick ("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
		return pick(left)(right);
	}

	return left * right; // NNN times 2*3
}; asterisk.types = [
	["N", "N", "N"], // times 2*3
	["A", "O", "O"], // pick ("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
	[["V", "B"], "A", "A"], // filter <5*(4 9 2 7 3)
];
let dollar = (left, right) => {
	if (isArray(right)) {
		if (isFunction(left)) {
			const result = right.slice(1).reduce((acc, value) => left(acc, value), right[0]); // (??X)AX insert +$(1 2)

			return result;
		}
		if (isString(left)) return pipe(map(toString), join(left))(right); // SAS join ","$(1 2 3)
	}
	if (isArray(left)) { // AA? reduce (+ 0)$(1 2 3)
		return reduce(left[0])(left[1])(right);
	}

	throw `Unable to resolve application of operator $ with arguments: ${JSON.stringify({left, right})}`;
}; dollar.types = [
	[["?", "?", "X"], "A", "X"], // insert +$(1 2)
	["S", "A", "S"], // join ","$(1 2 3)
	["A", "A", "?"], // reduce (+ 0)$(1 2 3)
	//[[["X", "Y"], "X", "Y"], "A", "Y"],
	//[[["X", "Y"], ["X", "Y"], ["X", "Y"]], "A", ["X", "Y"]],
];
let apostrophe = (left, right) => {
	if (isNumber(left) && (isArray(right) || isString(right))) return (left >= 0) ? right[left] : right[right.length + left]; // at
	if (isFunction(left) && isArray(right)) return tsFind(left)(right); // 1A?
	if (isString(left) && isObject(right)) return right[left]; // prop SO?
	if (isArray(left) && (isArray(right) || isObject(right))) {
		if ((left.length === 2) && isArray(left[0]) && isUnaryFunction(left[1])) { // over AAA AOO
			return applyOver({path: left[0], fn: left[1], container: right});
		} else {
			return path(left)(right); // path AA?, AO?
		}
	}

	throw `Unable to resolve application of operator ' with arguments: ${JSON.stringify({left, right})}`;
}; apostrophe.types =[["N", "A", "?"], ["N", "S", "S"], ["S", "O", "?"], ["A", "A", "?"], ["A", "O", "?"], ["A", "O", "O"], ["A", "A", "A"], [["V", "B"], "A", "V"]];
// apostrophe.types = [[0, 0, "?"], [1, 0, 0], [0, 1, 1]];
let equal = (left, right) => {
	return toString(left) === toString(right);
}; equal.types = [["V", "V", "B"]];
equal.supportsUndefined = true;
let bar = (left, right) => {
	const isFalseyLeft = isFalsey(left);

	if (isFalseyLeft || isFalsey(right)) {
		return isFalseyLeft ? right : left;
	}

	if (isUnaryFunction(left) && isUnaryFunction(right)) {
		let fn = x => {
			const leftResult = left(x);

			return isFalsey(leftResult) ? right(x) : leftResult;
		};
		fn.types = types(left); // assume

		return fn;
	}
	if (isBinaryFunction(left) && isBinaryFunction(right)) {
		let fn = (x, y) => {
			const leftResult = left(x, y);

			return isFalsey(leftResult) ? right(x, y) : leftResult;
		};
		fn. types = types(left); // assume

		return fn;
	}

	return left;
}; bar.types = [["V", "V", "V"], [["?", "?"], ["?", "?"], ["?", "?"]], [["?", "?", "?"], ["?", "?", "?"], ["?", "?", "?"]]];
//bar.types = [[0, 0, 0], [1, 1, 1], [2, 2, 2]];
bar.supportsUndefined = true;
let percent = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left % right; // modulo
	if (isNumber(left) && (isArray(right) || isString(right))) return [right.slice(0, left), right.slice(left)]; // split
	if (isArray(left) && isArray(right)) return chunk({sizes: left, vector: right, newVector: [], append: (acc, value) => [...acc, value]}); // chunkArray
	if (isArray(left) && isString(right)) return chunk({sizes: left, vector: right.split(""), newVector: "", append: (acc, value) => `${acc}${value}`}); // chunkString
	if (isBinaryFunction(left) && isArray(right)) return chunkWhen({when: left, vector: right, newVector: [], append: (acc, value) => [...acc, value]}); // chunkArrayWhen
	if (isFunction(left) && isString(right)) return chunkWhen({when: left, vector: right.split(""), newVector: "", append: (acc, value) => `${acc}${value}`}); // chunkStringWhen

	throw `Unable to resolve application of operator % with arguments: ${JSON.stringify({left, right})}`;
}; percent.types = [["N", "N", "N"], ["N", "A", "A"], ["N", "S", "A"], ["A", "A", "A"], ["A", "S", "A"], [["V", "V", "V"], "A", "A"], [["S", "S", "S"], "S", "A"]];
//percent.types = [[0, 0, 0], [1, 0, 0], [2, 0, 0]];
let hat = (left, right) => {
	if (isNumber(left) && isNumber(right)) return Math.pow(left, right); // power
	if (isFunction(left) && isNumber(right)) return map((value, index) => left(index))(Array.from(Array(right))); // generate
	if (isArray(left) && isArray(right)) return whileInternal({fns: left, startingArray: right}); // while

	throw `Unable to resolve application of operator ^ with arguments: ${JSON.stringify({left, right})}`;
}; hat.types = [["N", "N", "N"], [["N", "?"], "N", "A"], ["A", "A", "A"]];
// hat.types = [[0, 0, 0], [1, 0, 0], [1, 1, 1]];
let ampersand = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) { // andPredicate 111
		let result = value => left(value) && right(value);

		result.types = types(left); // TODO: edge cases abound here

		return result;
	}

	return left && right; // andValue 000
}; ampersand.types = [["V", "V", "V"], [["V", "V"], ["V", "V"], ["V", "V"]]];
// ampersand.types = [[0, 0, 0], [1, 1, 1]];

//----------------------------------------------------------
// Unary

let tilde = value => { // not referenced directly when passed number (standard form exported)
	if (isNumber(value)) return -value; // NN negative ~5
	if (isArray(value)) return transpose(value); // AA transpose ~((1 2) (3 4))
	if (isBinaryFunction(value)) { // (XYZ)(YXZ) flip ~/
		let fn = (x, y) => value(y, x);

		fn.types = map(([left, right, output]) => [right, left, output])(types(value));

		return fn;
	}

	throw `Unable to resolve application of operator ~ with arguments: ${JSON.stringify({left, right})}`;
}; 
tilde.types = [
	["N", "N"], // negative ~5
	["A", "A"], // transpose ~((1 2) (3 4))
	[["X", "Y", "Z"], ["Y", "X", "Z"]], // flip ~/
];
let underscore = vector => {
	// AA reverseArray _(1 2 3)
	if (isArray(vector)) return vector.slice(0).reverse();

	// SS reverseString _"Hello"
	return vector.split("").reverse().join(""); // string
}; underscore.types = [
	["A", "A"], // reverseArray _(1 2 3)
	["S", "S"], // reverseString _"Hello"
];
let bracketleft = vector => {
	return vector[0]; // A? SS first firstInString [(1 2 3) ["abc"
}; bracketleft.types = [
	["A", "?"], // first [(1 2 3)
	["S", "S"], // firstInString ["abc"
];
let bracketright = vector => {
	return vector[vector.length - 1]; // A? SS last lastInString ](1 2 3) ]"abc"
}; bracketright.types = [
	["A", "?"], // last ](1 2 3)
	["S", "S"], // lastInString ]"abc"
];
let hash = vector => {
	if (isObject(vector)) return Object.keys(vector).length;

	return vector.length;
}; hash.types = [["A", "N"], ["S", "N"], ["O", "N"]];
let backslash = from => {
	if (Array.isArray(from)) return Object.fromEntries(from ); // AO fromPairs \(("a" 1) ("b" 2))
	else return Object.entries(from); // OA toPairs \({"{a: 1, b: 2}")
};
backslash.types = [
	["A", "O"], // fromPairs \(("a" 1) ("b" 2))
	["O", "A"], // toPairs \({"{a: 1, b: 2}")
];
let backtick = value => {
	let fn = dummy => value; // X(?X) constant `2
	fn.types = map(prepend("?"))(types(value));

	return fn;
}; backtick.types = [
	["X", ["?", "X"]], // constant `2
];
let braceleft = input => {
	if (isArray(input)) return reduce((acc, value) => [...acc, ...(isArray(value) ? value : [value])])([])(input); // AA unnest {(1 (2 3))

	// should never be referenced directly for literal evaluation - expanded in parser
	return eval(input); // S? eval {"Math.sqrt(2)"
}; braceleft.types = [
	["S", "?"], // eval {"Math.sqrt(2)"
	["A", "A"], // unnest {(1 (2 3))
];
let semicolon = value => {
	return value; // XX identiy ;1
}; semicolon.types = [
	["X", "X"], // identity ;1
];
let braceright = value => {
	return typeOf(value);
}; braceright.types = [["V", "S"], [["?", "?"], "S"], [["?", "?", "?"], "S"]];
let bang = value => {
	if (isBinaryFunction(value)) {
		let fn = (x, y) => !isTruthy(value(x, y));

		fn.types = value.types;

		return fn;
	}
	if (isUnaryFunction(value)) {
		let fn = x => !isTruthy(value(x));

		fn.types = value.types;

		return fn;
	}

	return !isTruthy(value);
}; bang.types = [["V", "B"], [["X", "Y", "Z"], ["X", "Y", "Z"]], [["X", "Y"], ["X", "Y"]]];
// bang.types = [[0, 0], [1, 1], [2, 2]];

//==========================================================
// main exports

export default {
	arity,
	apply,
	typeOf,

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
