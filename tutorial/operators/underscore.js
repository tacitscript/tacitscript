import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "underscore",
	symbol: "_",
	type: "Unary",
	sections: [{
		id: "negative",
		type: "NN",
		examples: getOperationExamples([
			["negativeTwo", "_2", "equals -2"],
		]),
	}],
};