import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "bang",
	symbol: "!",
	type: "Unary",
	sections: [{
		id: "notValue",
		type: "VB",
		examples: getOperationExamples([
			["notTwo", "!2", <span>is <i>false</i></span>],
		]),
	}, {
		id: "notPredicate",
		type: "(VV)(VB)",
		examples: getOperationExamples([
			["notOdd", "!(%2.=1)", <span>notOdd0 is <i>true</i></span>],
		]),
	}, {
		id: "notComparator",
		type: "(VVV)(VVB)",
		examples: getOperationExamples([
			["notLess", "!<", <span>2notLess2 is <i>true</i></span>],
		]),
	}],
};