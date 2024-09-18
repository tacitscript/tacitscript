import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "greater",
	symbol: ">",
	type: "Infix",
	sections: [{
		id: "greaterThan",
		type: "NNB\tSSB",
		examples: getOperationExamples([
			["numberGreater", "2>3", <span>is <i>false</i></span>],
			["stringGreater", '"cad">"bad"', <span>is <i>true</i></span>],
		]),
	}],
};