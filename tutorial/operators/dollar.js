import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "dollar",
	symbol: "$",
	type: "Infix",
	sections: [{
		id: "reduce",
		type: "(QQX)AX\tAAQ",
		examples: getOperationExamples([
			["sum", "+$(3 4 5)", "equals 12"],
			["changeFromPound", '(- 100)$(50 20 5)', 'equals (100-50-20-5)=25'],
		]),
	}],
};