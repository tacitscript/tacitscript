import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "less",
	symbol: "<",
	type: "Binary",
	sections: [{
		id: "lessThan",
		type: "NNB\tSSB",
		examples: getOperationExamples([
			["numberLess", "2<3", <span>is <i>true</i></span>],
			["stringLess", '"cad"<"bad"', <span>is <i>false</i></span>],
		]),
	}],
};