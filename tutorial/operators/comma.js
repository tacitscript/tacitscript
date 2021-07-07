import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "comma",
	symbol: ",",
	type: "Binary",
	sections: [{
		id: "applyTo",
		type: "X(XY)Y\t\tX(XYZ)(YZ)",
		examples: getOperationExamples([
			["applyToUnary", "3,+1", "equals 4"],
			["applyToBinary", "1,-", "equivalent to 1-"],
		]),
	}],
};