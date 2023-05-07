import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "minus",
	symbol: "-",
	type: "Binary",
	sections: [{
		id: "subtract",
		type: "NNN",
		examples: getOperationExamples([
			["difference", "3-2", "equals 1"],
		]),
	}],
};