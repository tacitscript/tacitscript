import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "hat",
	symbol: "^",
	type: "Binary",
	sections: [{
		id: "power",
		type: "NNN",
		examples: getOperationExamples([
			["twoCubed", "2^3", "equals 8"],
			["rootFour", '4^(_0.5)', "equals 2"],
		]),
	}],
};