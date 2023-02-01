import parser from "./parser.js";

const {ts2es6} = parser;

///==========================================================
// functional utilites

const pipe = (...args) => value => args.reduce((acc, fn) => fn(acc), value);
const map = fn => array => array.map(fn);
const mapObj = fn => object => Object.assign({}, ...Object.keys(object).map(key => ({[key]: fn(object[key])})));
const mapObjIndexed = fn => object => Object.assign({}, ...Object.keys(object).map(key => ({[key]: fn(key, object[key])})));
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
const last = array => array[array.length - 1];
const toPairs = obj => Object.entries(obj);
const fromPairs = pairs => Object.fromEntries(pairs);
const filter = check => array => array.filter(check);
const filterObject = check => obj => pipe(toPairs, filter(pipe(last, check)), fromPairs)(obj);
const filterObjIndexed = checkB => obj => pipe(toPairs, filter(([key, value]) => isTruthy(checkB(key, value))), fromPairs)(obj);
const contains = value => array => array.includes(value);
const pick = keys => object => pipe(toPairs, filter(([key]) => contains(key)(keys)), fromPairs)(object);
const sortBy = fn => array => [...array].sort((a, b) => {const valA = fn(a), valB = fn(b); return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;});
const combinations = array1 => array2 => unnest(map(value1 => map(value2 => [value1, value2])(array2))(array1));
const unnest = arrays => {let result = [], length = arrays.length; for (let i = 0; i < length; i += 1) Array.prototype.push.apply(result, arrays[i]); return result;};
const splice = (array, start, deleteCount, ...items) => {const copy = array.slice(0); copy.splice(start, deleteCount, ...items); return copy;};
const omit = keys => object => {const copy = {...object}; keys.forEach(key => delete copy[key]); return copy;};
const path = array => obj => reduce((acc, index) => acc && acc[index])(obj)(array);
const all = check => array => array.every(check);
const flatten = values => {let result = [], length = values.length; for (let i = 0; i < length; i += 1) {const value = values[i]; Array.prototype.push.apply(result, Array.isArray(value) ? flatten(value) : [value]);} return result;};
const groupBy = fn => array => {let result = {}, length = array.length; for (let i = 0; i < length; i += 1) {const value = array[i], key = fn(value); if (result[key] == undefined) result[key] = [value]; else result[key].push(value);} return result;};
const identity = x => x;
const values = obj => Object.values(obj);
const any = check => array => array.some(check);
const take = number => array => array.slice(0, number);
const append = value => array => [...array, value];
const first = array => array[0];
const reverse = array => [...array].reverse();

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
const tsFilterObject = tsPredicate(filterObject);

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

	if (value.length === 1) return 1;

	return 2;
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

const apply = (left, right) => {
	if ((left == undefined) && !supportsUndefined(right)) return undefined;
	if ((right == undefined) && !supportsUndefined(left)) return undefined;

	const arityLeft = arity(left);
	const arityRight = arity(right);

	if (!left || !left.noLeftApply) {
		if (arityRight === 2) {
			const result = leftApply(left, right);
			if (right.linear) result.noLeftApply = true;

			return result;
		}
		// if (arityRight === 1) return right(left);
	}
	if (arityLeft === 2) return rightApply(left, right);
	if (arityLeft === 1) return left(right);

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
	if (!supportsUndefined(binaryFn)) {
		if ((left == undefined) || (right == undefined)) return undefined;
	}

	return binaryFn(left, right);
};
const rightApply = (binaryFn, right) => left => {
	if (!supportsUndefined(binaryFn)) {
		if ((left == undefined) || (right == undefined)) return undefined;
	}

	return binaryFn(left, right);
};
const scanInternal = ({fns, startingArray}) => {
	let result = [...startingArray];

	while (isTruthy(fns[0](result))) result.push(fns[1](result));

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

	throw `Unable to resolve operator application (${leftString})${operator}(${rightString})`;
};
const errorUnary = ({value, operator}) => {
	let valueString = "Fn";

	try {valueString = toString(value);} catch (_) {}

	throw `Unable to resolve operator application ${operator}(${valueString})`;
};

//----------------------------------------------------------
// Binary

const comma = (left, right) => {
	if ((left == undefined) && !right.supportsUndefined) return undefined;

	if (isArray(right)) {
		if (isArray(left)) {																					// zipApplyTo			AAA						(3 1),(+1 /),(; 2,)=(4 0.5)
			return pipe(
				transpose,
				map(([leftValue, rightValue]) => comma(leftValue, rightValue)),
			)([left, right]);
		}
		if (isUnaryFunction(left)) return x => comma(left(x), right);											// unaryZipApplyTo		(XA)A(XA)				$2,(*2 /2)(1 )=(2 1)
		if (isBinaryFunction(left)) return (x, y) => comma(left(x, y), right);									// binaryZipApplyTo		(XYA)A(XYA)				4(:,(+1 -1))3=(5 2)
	}
	if (isBinaryFunction(left) && isUnaryFunction(right)) return x => right(leftApply(x, left));				// binaryUnaryApply		(XYZ)((YZ)W)(XW)		(+,^3)1=(1 2 3)
																												// binaryUnaryApply		(XYZ)((YZ)(WR))(X(WR))	>,(#.)(3)(1 2 3)=()
	if (isUnaryFunction(right)) return right(left); 															// applyToUnary			X(XY)Y					3,+1=4
	if (isBinaryFunction(right)) return value => right(left, value);											// applyToBinary		X(XYZ)(YZ)				(1,/)2=0.5

	errorBinary({left, right, operator: ","});
}; comma.linear = true;
const dot = (left, right) => {
	if (isArray(right)) {
		if (isValue(left)) return map(value => comma(left, value))(right);										// applyToArray			VAA						(1 2 3).(# [)=(3 1)
		if (isUnaryFunction(left)) return x => map(value => comma(left(x), value))(right);						// pipeToArray			(VV)A(VA)				[.(+1 -2)(3 2 1)=(4 1)
		if (isBinaryFunction(left)) return (x, y) => map(value => comma(left(x, y), value))(right);				// pipeBinaryToArray	(VVV)A(VVA)				5(:.(+$ -$))3=(8 2)
	} else {
		if (isBinaryFunction(left) && isUnaryFunction(right)) return (a, b) => right(left(a, b));				// binaryUnaryPipe		(XYZ)(ZW)(XYW)			5(:.-$)3=2
		if (isUnaryFunction(left) && isBinaryFunction(right)) return value => leftApply(left(value), right);	// unaryBinaryPipe		(XY)(YZW)(X(ZW))		(+1./)7(4)=2
		if (isUnaryFunction(left) && isUnaryFunction(right)) return value => right(left(value));				// pipe					(XY)(YZ)(XZ)			(+1.*2)3=8
		if (isBinaryFunction(left) && isBinaryFunction(right)) return (a, b) => leftApply(left(a, b), right);	// binaryBinaryPipe		(XYZ)(ZWR)(WR)			3(:.:)4(5 6)=((3 4) (5 6))
	}

	errorBinary({left, right, operator: "."});
}; dot.linear = true;
const plus = (left, right) => {
	if (isString(left) && isValue(right)) {																		// stringConcat			SSS						"abc"+"def"="abcdef"
		try {																									// toString				SVS						"2"+3="23"
			return `${left}${toString(right)}`;
		} catch (_) {
			return undefined;
		}
	}
	if (isArray(left) && isArray(right)) return [...left, ...right];											// arrayConcat			AAA						(1 2 3)+(4 5 6)=(1 2 3 4 5 6)
	if (isObject(left) && isObject(right)) return  mergeDeep(left, right);										// merge				DDD						(("a" 1) ("b" 2))\+((("b" 3) ("c" 4))\)=((("a" 1") ("b" 3) ("c" 4))\)
	if (isNumber(left) && isValue(right)) {																		// add					NNN						2+3=5
		const rightValue = isString(right) ? ((right[0] === "_") ? (+right.slice(1) * -1) : +right) : right;	// parse				NSN						2+"3"=5
		const result = left + rightValue;																		// parse				NSO						2+"abc"=(1/0)		

		return isNaN(result) ? undefined : result;
	}

	errorBinary({left, right, operator: "+"});
};
const slash = (left, right) => {
	if (isNumber(left) && isNumber(right)) {																	// divide				NNN						8/2=4
		if (right === 0) return undefined;																		// divide				NNO						2/0=(1/0)

		return left / right;
	}
	if (isUnaryFunction(left) && isArray(right)) return groupBy(left)(right);									// groupBy				(VV)AD					 [/("ann" "ben" "ade")=(("a" ("ann" "ade")) ("b" ("ben" ))\)

	errorBinary({left, right, operator: "/"});
};
const less = (left, right) => {
	if ((isNumber(left) && isNumber(right))																		// less					NNT						3<2=()
		|| (isString(left) && isString(right)))	return left < right;											// less					SST						"abc"<"def"=(()!)
	if (isUnaryFunction(left) && isArray(right)) return sortBy(left)(right);									// ascendingSort		(VN)AA					;<(2 3 1)=(1 2 3)
																												// ascendingSort		(VS)AA					;<("b" "c" "a")=("a" "b" "c")
	if (isUnaryFunction(left) && isValue(right)) {																// tap					(V?)VV					"x => console.log.call(null, x)"{<3=3
		try {
			comma(right, left);
		} catch (_) {}

		return right;
	}

	errorBinary({left, right, operator: "<"});
};
const greater = (left, right) => {
	if ((isNumber(left) && isNumber(right))																		// greater				NNT						3>2=(()!)
		|| (isString(left) && isString(right))) return left > right;											// greater				SST						"abc">"def"=()
	if (isUnaryFunction(left) && isArray(right)) return pipe(sortBy(left), reverse)(right);						// descendingSort		(VN)AA					;>(2 3 1)=(3 2 1)
																												// descendingSort		(VS)AA					;>("b" "c" "a")=("c" "b" "a")
	if (isArray(left) && (isArray(right) || isObject(right))) {													// over					AAA						((1 ) +1)>(3 5 7)=(3 6 7)
		return applyOver({path: left[0], fn: left[1], container: right});										// over					ADD						(("a" ) +1)>((("a" 1) )\)=((("a" 2) )\)
	}

	errorBinary({left, right, operator: ">"});
};
const minus = (left, right) => {
	if (isNumber(left) && isNumber(right)) return left - right;													// subtract				NNN						5-2=3
	if (isObject(left) && isString(right)) {																	// omitKey				DSD						(("a" 1) )\-"a"=(( )\)
		const {[right]: deletedKey, ...remainder} = left;

		return remainder;
	}
	if (isObject(left) && isArray(right)) { 																	// omitKeys				DAD						(("a" 1) ("b" 2))\-("a" "b")=(( )\)
		return omit(right)(left);
	}
	if (isArray(left) && isArray(right)) return splice(left, ...right);											// splice				AAA						(5 6 7 8)-(1 2 3 4)=(5 3 4 8)
	if (isString(left) && isArray(right)) return left.substring(0, right[0]) + (right[2] || "")					// splice				SAS						"nucular"-(3 2 "le")="nuclear"
		+ left.substring(right[0] + right[1]);

	errorBinary({left, right, operator: "-"});
};
const colon = (left, right) => {
	return [left, right];																						// pair					??A						+1:2,(3, +3)=(4 5)

	errorBinary({left, right, operator: ":"});
};
const question = (left, right) => {
	if (isArray(left) && isValue(right)) {																		// cond					AVV						((<10 +1) -1)?15=14
		for (let i = 0; i < left.length; ++i) {
			const line = left[i];

			if (!isArray(line)) return comma(right, line);

			const check = comma(right, line[0]);

			if (isTruthy(check)) return comma(right, line[1]);
		}

		return undefined;
	}
	if (isNumber(left) && isNumber(right)) {																	// random				NNN						1(<|=)(1?10)<10
		return (Math.random() * (right - left)) + left;
	}
	if (isUnaryFunction(left) && isArray(right)) return tsFilter(left)(right);									// filter				(VV)AA					<5?(4 9 2 7 3)=(4 2 3)
	if (isUnaryFunction(left) && isObject(right)) return tsFilterObject(left)(right);							// filter				(VV)DD					(%2.=0)?((("a" 1) ("b" 2))\)=((("b" 2) )\)
	if (isBinaryFunction(left) && isObject(right)) return filterObjIndexed(left)(right);						// filterObjIndexed		(SVV)DD					(+.="b2")?((("a" 1) ("b" 2))\\)=((("b" 2) )\\)

	errorBinary({left, right, operator: "?"});
};
question.supportsUndefined = true;
let atsign = (left, right) => {
	const applyLeft = value => comma(value, left); // apply(left, value);
	const applyIndexedLeft = (index, value) => comma(value, val => left(index, val));

	if (isObject(right)) {
		if (isUnaryFunction(left)) return mapObj(applyLeft)(right);												// map					(VV)DD					*2@((("a" 1) ("b" 2))\)=((("a" 2) ("b" 4))\)
		if (isBinaryFunction(left)) return mapObjIndexed(applyIndexedLeft)(right);								// mapObjIndexed		(SVV)DD					+@((("a" 1) ("b" 2))\)=((("a" "a1") ("b" "b2"))\)
	}


	if (isFunction(left) && isArray(right)) return map(applyLeft)(right);										// map					(VV)AA					*2@(3 4 5)=(6 8 10)
																												// map					(VVV)AA					(=@(3 4 5),|$)6=()
	if (isArray(left) && isString(right)) return String.prototype.replaceAll.apply(right, left);				// replaceAll			ASS						("_" "-")@"_1 0 _1"="-1 0 -1"
	if (isValue(left) && isArray(right)) {																		// indicesOf			VAA						2@(6 8 2 3 2)=(2 4)
		try {
			const leftString = toString(left);
			const leftType = typeOf(left);
			const indices = [];
			const length = right.length;

			for (var i = 0; i < length; i += 1) {
				const value = right[i];

				if ((leftType === typeOf(value)) && (leftString === toString(value))) indices.push(i);
			}

			return indices;
		} catch (_) {
			return undefined;
		}
	}
	if (isString(left) && isString(right)) {																	// indicesOf			SSA						"bc"@"abcbcd"=(1 3)
		const indices = [];
		const length = right.length;

		for (var i = 0; i < length; i += 1) {
			if (right.slice(i).startsWith(left)) indices.push(i);
		}

		return indices;
	}
	// if (isUnaryFunction(left) && isArray(right)) {															// findIndices			(VV)AA					(%2.=0)@(1 2 3 4)=(1 3)
	// 	try {
	// 		const indices = [];
	// 		const length = right.length;

	// 		for (var i = 0; i < length; i += 1) {
	// 			if (isTruthy(left(right[i]))) indices.push(i);
	// 		}

	// 		return indices;
	// 	} catch (_) {
	// 		return undefined;
	// 	}
	// }

	errorBinary({left, right, operator: "@"});
};
const asterisk = (left, right) => {
	if (Array.isArray(left) && isObject(right)) return pick(left)(right);										// pick					ADD						("a" "c" "d")*((("a" 1) ("b" 2) ("c" 3))\)=((("a" 1) ("c" 3))\)
	if (isNumber(left) && isNumber(right)) return left * right; 												// times				NNN						2*3=6

	errorBinary({left, right, operator: "*"});
};
const dollar = (left, right) => {
	// 	if (isArray(left)) { // AA? reduce (+ 0)$(1 2 3)
	// 		return reduce(left[0])(left[1])(right);
	// 	}	
	// } else if (isBinaryFunction(left) && isStream(right)) return processStream({generator: right, reducer: left});

	if (isString(left) && isArray(right)) {																		// join					SAS						", "$(1 2 3)="1, 2, 3"
		try {
			return pipe(map(toString), join(left))(right);
		} catch (_) {
			return undefined;
		}
	}
	if (isBinaryFunction(left) && isArray(right)) return right.reduce((acc, value) => left(acc, value));		// reduce				(VVV)AA					+$(1 2 3)=6
	if (isValue(left) && isArray(right)) return [left, ...right];												// prepend				VAA						1$(2 3)=(1 2 3)

	errorBinary({left, right, operator: "$"});
};
const apostrophe = (left, right) => {
	if (isNumber(left) && isNumber(right)) {																	// round				NNN						3'3.1419=3.142
		const factor = Math.pow(10, left);

		return Math.round(right * factor) / factor;
	}
	if (isNumber(left) && (isArray(right) || isString(right)))													// at					NA?						1'(1 2 3)=2
		return (left >= 0) ? right[left] : right[right.length + left];											// at					NSS						1'"abc"="b"
	if (isString(left) && isObject(right)) return right[left];													// prop					SD?						"a"'((("a" 1) )\)=1
	if (isArray(left) && (isArray(right) || isObject(right))) {													// path					AA?						(1 )'(1 2 3)=2
		return path(left)(right);																				// path					AD?						("a" )'((("a" 1) )\)=1
	}
	if (isUnaryFunction(left) && isArray(right)) return tsFind(left)(right);									// find					(VV)AV					(%2.=0)'(1 2 3)=2

	errorBinary({left, right, operator: "'"});
};
const equal = (left, right) => {
	if (!isValue(left) || !isValue(right)) errorBinary({left, right, operator: "="});

	try {																										// equals				VVT						2=4=()
		return (typeOf(left) === typeOf(right)) && (toString(left) === toString(right));
	} catch (_) {
		return undefined;
	}

	errorBinary({left, right, operator: "="});
};
let bar = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) {														// or					(VV)(VV)(VV)			(>0|(%2.=0))(_2)=(()!)
		let fn = x => {
			const leftResult = comma(x, left);

			return isFalsey(leftResult) ? comma(x, right) : leftResult;
		};

		return fn;
	}
	if (isBinaryFunction(left) && isBinaryFunction(right)) {													// or					(VVV)(VVV)(VVV)			2(<|=)2=(()!)
		let fn = (x, y) => {
			const leftResult = left(x, y);

			return isFalsey(leftResult) ? right(x, y) : leftResult;
		};

		return fn;
	}
	if (isValue(left)) return isFalsey(left) ? right : left;													// or					V??						()|3=3

	errorBinary({left, right, operator: "|"});
}; bar.linear = true;
bar.supportsUndefined = true;
const percent = (left, right) => {
	if (isNumber(left)) {
		if (isNumber(right)) return (right === 0) ? undefined : (left % right);									// remainder			NNN						7%2=1
		else if (isArray(right) || isString(right)) return [right.slice(0, left), right.slice(left)]; 			// split				NAA						2%(1 2 3 4 5)=((1 2) (3 4 5))
																												// split				NSA						2%"abcde"=("ab" "cde")
	// 	else if (isStream(right)) return streamTake({n: left, generator: right});
	}
	else if (isArray(left)) {
		if (isArray(right)) return chunk({sizes: left, vector: right, newVector: []});							// chunk				AAA						(1 2 0)%(1 2 3 4 5)=((1 ) (2 3) (4 5))
		else if (isString(right)) return chunk({sizes: left, vector: right.split(""), newVector: ""}); 			// chunk				ASA						(1 2 0)%"abcde"=("a" "bc" "de")
	}
	else if (isString(left) && isString(right)) {
		return right.split(left);																				// chunkWithDelimiter	SSA						", "%"1, 2, 3, 4"=("1" "2" "3" "4")
	}
	else if (isBinaryFunction(left)) {
		if (isArray(right)) return chunkWhenComparator({when: left, vector: right, newVector: []});				// chunkWhenComparator	(VVV)AA					<%(1 2 3 2 1)=((1 ) (2 ) (3 2 1))
		else if (isString(right))																				// chunkWhenComparator	(SSV)SA					<%"abcba"=("a" "b" "cba")
			return chunkWhenComparator({when: left, vector: right.split(""), newVector: ""});
	}

	errorBinary({left, right, operator: "%"});
};
const hat = (left, right) => {
	if (isNumber(left) && isNumber(right)) return Math.pow(left, right);										// power				NNN						2^3=8
	if (isUnaryFunction(left) && isNumber(right))																// generate				(N?)NA					;^3=(0 1 2)
		return map((value, index) => left(index))(Array.from(Array(right)));
	if (isArray(left) && isArray(right)) return scanInternal({fns: left, startingArray: right});				// scan					AAA						(#.<5 #.+1)^( )=(1 2 3 4 5)
	// if (isUnaryFunction(left) && isUnaryFunction(right)) { // while 1,(<10^(*2))
	// 	let result = x => whileInternal({whileCondition: left, next: right, start: x});

	// 	result.types = right.types;

	// 	return result;
	// }
	// if (isUnaryFunction(left) && isArray(right)) return lazyScan({next: left, start: right}); // (AV)AL lazyScan (#.+1)^( )

	errorBinary({left, right, operator: "^"});
};
const ampersand = (left, right) => {
	if (isUnaryFunction(left) && isUnaryFunction(right)) {														// and					(VV)(VV)(VV)			>2&(<6)6=()
		return value => {
			const leftValue = comma(value, left);

			return isTruthy(leftValue) ? comma(value, right) : leftValue;
		}
	}
	if (isValue(left) && isValue(right)) return isTruthy(left) ? right : left; 									// and					V??						()!&3=3

	errorBinary({left, right, operator: "&"});
}; ampersand.linear = true;
const backtick = (left, right) => {
	return left;																								// constant				XVX						2`3=2

	errorBinary({left, right, operator: "`"});
}; backtick.supportsUndefined = true;

//----------------------------------------------------------
// Unary

const tilde = value => {
	if (isBinaryFunction(value)) return (x, y) => value(y, x);													// flip					(XYZ)(YXZ)				2(/~)6=3
	if (isArray(value)) return transpose(value);																// transpose			AA						~((1 2) (3 4))=((1 3) (2 4))

	errorUnary({operator: "~", value});
}; 
const underscore = value => {
	// function won't be output on negative literals - expanded in parser
	if (isNumber(value)) return -value;																			// negative				NN						3_
	if (isArray(value)) return value.slice(0).reverse();														// reverse				AA						(1 2 3)_=(3 2 1)
	if (isString(value)) return value.split("").reverse().join("");												// reverse				SS						"Hello"_="olleH"

	errorUnary({operator: "_", value});
};
const bracketleft = value => {
	if (isVector(value)) return value[0];																		// first				A?						(1 2 3)[=1
																												// first				SS						"abc"[="a"
	if (isNumber(value)) return Math.floor(value);																// floor				NN						1.2_[=(2_)

	errorUnary({operator: "[", value});
};
const bracketright = value => {
	if (isVector(value)) return value[value.length - 1];														// last					A?						(1 2 3)]=3
																												// first				SS						"abc"]="c"
	if (isNumber(value)) return Math.ceil(value);																// ceiling				NN						1.8_]=(1_)

	errorUnary({operator: "]", value});
};
const hash = value => {
	if (isVector(value)) return value.length;																	// length				AN						#(4 5 6)=3
																												// length				SN						#"abcd"=4
	if (isObject(value)) return Object.keys(value).length;														// length				ON						#(\(("a" 1) )=1
	if (isNumber(value)) return Math.abs(value);																// modulus				NN						#(_1.5)=1.5

	errorUnary({value, operator: "#"});
};
const backslash = value => {
	if (isArray(value)) return Object.fromEntries(value);														// fromPairs			AD						\(("a" 1)  ("b" 2))
	if (isObject(value)) return Object.entries(value);															// toPairs				DA						\(\(("a" 1)  ("b" 2))=(("a" 1)  ("b" 2)))

	errorUnary({value, operator: "\\"});
};
const braceleft = value => {
	if (isArray(value))
		return reduce((acc, value) => [...acc, ...(isArray(value) ? value : [value])])([])(value);				// unnest				AA						{(1 (2 3))=(1 2 3)
	// function won't be output on literal evaluation - expanded in parser
	if (isString(value)) return eval(ts2es6(value));															// eval					S?						{"Math.sqrt"4=2
	// if (isStream(value)) return [...value()]; // ["L", "A"], // spread {(3%naturalNumbers)

	errorUnary({operator: "{", value});
};
const semicolon = value => {
	return value;																								// identity				XX						;1=1

	errorUnary({operator: ";", value});
};
const braceright = value => {
	return typeOf(value);																						// typeof				?S						}3="N"

	errorUnary({operator: "}", value});
};
const bang = value => {
	if (isBinaryFunction(value)) return (x, y) => isFalsey(value(x, y));										// not					(VVV)(VVB)				2(!<)3=()
	if (isUnaryFunction(value)) return x => isFalsey(value(x));													// not					(VV)(VB)				!(>3)4=()
	if (isValue(value)) return isFalsey(value);																	// not					VB						!5=()

	errorUnary({value, operator: "!"});
}; bang.supportsUndefined = true;

//==========================================================
// main exports

const ts = {
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

export default ts;