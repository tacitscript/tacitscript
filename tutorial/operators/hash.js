import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "hash",
	symbol: "#",
	type: "Prefix",
	sections: [{
		id: "length",
		type: "AN\tSN\tDN",
		examples: getOperationExamples([
			["lengthArray", "#(5 6 7)", "equals 3"],
			["lengthEmptyArray", '#( )', 'equals 0'],
			["lengthString", '#"Hello, World!"', 'equals 13'],
			["lengthEmptyString", '#""', "equals 0"],
			["lengthDict", '#(\\(("a" 3) ("b" 4)))', 'equals 2'],
			["lengthEmptyDict", '#(\\( ))', 'equals 0'],
		]),
	}],
};