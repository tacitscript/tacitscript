import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "question",
	symbol: "?",
	type: "Infix",
	sections: [{
		id: "cond",
		type: "AVV",
		examples: getOperationExamples([
			["parity", `((%2.=0 +" is even") +" is odd")?`, `parityNS3="3 is odd"`],
		]),
	}],
};