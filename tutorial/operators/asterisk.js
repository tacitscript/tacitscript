import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "asterisk",
	symbol: "*",
	type: "Binary",
	sections: [{
		id: "multiply",
		type: "NNN",
		examples: getOperationExamples([
			["difference", "2*3", "equals 6"],
		]),
	}],
};