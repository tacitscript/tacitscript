import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "bracketleft",
	symbol: "[",
	type: "Unary",
	sections: [{
		id: "first",
		type: "A?\tSS",
		examples: getOperationExamples([
			["firstArray", "[(5 6 7)", "equals 5"],
			["firstEmptyArray", '[( )', <span>is <i>undefined</i></span>],
			["firstString", `["Hello, World!"`, `equals "H"`],
			["firstEmptyString", '[""', <span>is <i>undefined</i></span>],
		]),
	}],
};