import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "percent",
	symbol: "%",
	type: "Infix",
	sections: [{
		id: "remainder",
		type: "NNN",
		examples: getOperationExamples([
			["fiveRemainderTwo", "5%2", "equals 1"],
			["negativeRemainder", '_8%3', "equals -2 (result shares sign with left side)"],
			["invalidRemainder", '7%0', <span>is <i>undefined</i></span>]
		]),
	}],
};