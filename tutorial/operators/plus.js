import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "plus",
	symbol: "+",
	type: "Binary",
	sections: [{
		id: "add",
		type: "NVN",
		examples: getOperationExamples([
			["sum", "2+3", "equals 5"],
			["sumConvert", '2+"3"', "equals 5"],
			["sumInvalid", '2+"three"', <span>is <i>undefined</i></span>]
		]),
	}, {
		id: "concat",
		type: "AAA\tSVS",
		examples: getOperationExamples([
			["arrayConcat", "(1 2 3)+(2 3 4)", "equals (1 2 3 4 5 6)"],
			["stringConcat", '"Hello, "+"World!"', 'equals "Hello, World!"'],
			["convertConcat", '"Array: "+(1 2 3)', 'equals "Array: (1 2 3)"']
		]),
	}],
};