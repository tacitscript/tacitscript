import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "underscore",
	symbol: "_",
	type: "Prefix",
	sections: [{
		id: "negative",
		type: "RR",
		examples: getOperationExamples([
			["negativeTwo", "_2", "equals -2"],
		]),
	}, {
		id: "reverse",
		type: "AA\t\tSS",
		examples: getOperationExamples([
			["reverseArray", "_(1 2 3)", "equals (3 2 1)"],
			["reverseString", '_"Hello, World!"', 'equals "!dlroW ,olleH"'],
		]),
	}],
};