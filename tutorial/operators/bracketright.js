import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "bracketright",
	symbol: "]",
	type: "Unary",
	sections: [{
		id: "last",
		type: "A?\tSS",
		examples: getOperationExamples([
			["lastArray", "](5 6 7)", "equals 7"],
			["LastEmptyArray", ']( )', <span>is <i>undefined</i></span>],
			[<br/>],
			["lastString", `]"Hello, World!"`, `equals "!"`],
			["lastEmptyString", ']""', <span>is <i>undefined</i></span>],
		]),
	}],
};