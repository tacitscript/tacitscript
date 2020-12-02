
export default {
	id: "dot",
	symbol: ".",
	type: "Binary",
	sections: [{
		id: "pipe",
		type: "(XY)(YZ)(XZ)",
		examples: `halfAddOne\t/2.+1\t\t\t\t\thalfAddOne4=3`,
	}, {
		id: "binaryUnaryPipe",
		type: "(XYZ)(ZW)(XYW)",
		examples: `average\t\t+./2\t\t\t\t\t5average7=6`,
	}],
};