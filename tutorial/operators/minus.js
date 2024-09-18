import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "minus",
	symbol: "-",
	type: "Infix",
	sections: [{
		id: "subtract",
		type: "RRR",
		examples: getOperationExamples([
			["difference", "3-2", "equals 1"],
		]),
	}],
};