
export default {
	id: "plus",
	symbol: "+",
	type: "Binary",
	sections: [{
		id: "add",
		type: "NVN",
		examples: `sum\t\t2+3\t\t\t\t\tequals 5\nsumConvert\t2+"3"\t\t\t\t\tequals 5\nsumInvalid\t2+"three"\t\t\t\tundefined`,
	}],
};