import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "ampersand",
	symbol: "&",
	type: "Infix",
	sections: [{
		id: "andValue",
		type: "VVV",
		examples: getOperationExamples([
			["check", "1&2", "equals 2"],
		]),
	}, {
		id: "andPredicate",
		type: "(VV)(VV)(VV)",
		examples: getOperationExamples([
			["doubleCheck", ">2&(<6)", <span>doubleCheck(7) is <i>false</i></span>],
		]),
	}],
};