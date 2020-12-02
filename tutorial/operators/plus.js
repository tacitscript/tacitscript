
export default {
	id: "plus",
	symbol: "+",
	type: "Binary",
	sections: [{
		id: "add",
		type: "NVN",
		examples: `sum\t\t2+3\t\t\t\t\tequals 5\nsumConvert\t2+"3"\t\t\t\t\tequals 5\nsumInvalid\t2+"three"\t\t\t\tundefined`,
	}, {
		id: "concat",
		type: "AAA SVS",
		examples: `arrayConcat\t(1 2 3)+(2 3 4)\t\t\t\tequals (1 2 3 4 5 6)\n\nstringConcat\t"Hello, "+"World!"\t\t\tequals "Hello, World!"\n\
convertConcat\t"Array: "+(1 2 3)\t\t\tequals "Array: (1 2 3)"`,
	}],
};