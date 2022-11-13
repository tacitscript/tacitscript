import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "bar",
	symbol: "|",
	type: "Binary",
	sections: [{
		id: "orValue",
		type: "VVV",
		examples: getOperationExamples([
			["falseOrTwo", "()|2", "equals 2"],
		]),
	}, {
		id: "orPredicate",
		type: "(VV)(VV)(VV)",
		examples: getOperationExamples([
			["positiveOrEven", ">0|(%2.=0)", <span>positiveOrEven(_2) is <i>true</i></span>],
		]),
	}, {
		id: "orComparator",
		type: "(VVV)(VVV)(VVV)",
		examples: getOperationExamples([
			["lessOrEqual", "<|=", <span>2lessOrEqual2 is <i>true</i></span>],
		]),
	}],
};