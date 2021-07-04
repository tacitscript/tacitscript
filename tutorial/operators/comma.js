import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "comma",
	symbol: ",",
	type: "Binary",
	sections: [{
		id: "applyTo",
		type: "X(XY)Y",
		examples: getOperationExamples([
			["applyToOperator", "3,+1", "equals 4"],
		]),
	}],
};