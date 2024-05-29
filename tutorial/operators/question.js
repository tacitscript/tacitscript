import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "question",
	symbol: "?",
	type: "Binary",
	sections: [{
		id: "cond",
		type: "AAV",
		examples: getOperationExamples([
			["parity", `((%2.=0 +" is even") +" is odd")?`, `parityNS3="3 is odd"`],
		]),
	}],
};