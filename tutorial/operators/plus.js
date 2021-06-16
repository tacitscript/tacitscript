import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "plus",
	symbol: "+",
	type: "Binary",
	sections: [{
		id: "add",
		type: "NVN",
		examples: getOperationExamples([
			["sum", "2+3", "equals 5"],
			["sumConvert", '2+"3"', "equals 5"],
			["sumInvalid", '2+"three"', <span>is <i>undefined</i></span>]
		]),
	}, {
		id: "concat",
		type: "AAA   SVS",
		examples: `arrayConcat\t(1 2 3)+(2 3 4)\t\t\t\t\tequals (1 2 3 4 5 6)\n\nstringConcat\t"Hello, "+"World!"\t\t\t\tequals "Hello, World!"\n\
convertConcat\t"Array: "+(1 2 3)\t\t\t\tequals "Array: (1 2 3)"`,
	}],
};