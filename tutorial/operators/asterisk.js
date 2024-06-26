import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "asterisk",
	symbol: "*",
	type: "Binary",
	sections: [{
		id: "multiply",
		type: "NNN",
		examples: getOperationExamples([
			["difference", "2*3", "equals 6"],
		]),
	}, {
		id: "filter",
		type: "(VB)AA",
		examples: getOperationExamples([
			["filter", "<5*(2 4 6)", "equals (2 4)"],
		]),
	}],
};