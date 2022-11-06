import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "dot",
	symbol: ".",
	type: "Binary",
	sections: [{
		id: "pipe",
		type: "(XY)(YZ)(XZ)",
		examples: getOperationExamples([
			["halfAddOne", "/2.+1", "halfAddOne4=3"],
		]),
	}, {
		id: "binaryUnaryPipe",
		type: "(XYZ)(ZW)(XYW)",
		examples: getOperationExamples([
			["average", "+./2","5average7=6"],
		]),
	}],
};