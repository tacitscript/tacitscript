import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "dollar",
	symbol: "$",
	type: "Binary",
	sections: [{
		id: "reduce",
		type: "(??X)AX\tAA?",
		examples: getOperationExamples([
			["sum", "+$(3 4 5)", "equals 12"],
			["changeFromPound", '(- 100)$(50 20 5)', 'equals (100-50-20-5)=25'],
		]),
	}],
};