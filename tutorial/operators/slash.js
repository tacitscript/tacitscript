import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "slash",
	symbol: "/",
	type: "Binary",
	sections: [{
		id: "divide",
		type: "NNN",
		examples: getOperationExamples([
			["quotient", "5/2", "equals 2.5"],
			["divideByZero", "5/0", <span>is <i>undefined</i></span>],
		]),
	}],
};