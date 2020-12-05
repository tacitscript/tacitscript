
export default {
	id: "hash",
	symbol: "#",
	type: "Unary",
	sections: [{
		id: "length",
		type: "AN SN ON",
		examples: `sum\t\t2+3\t\t\t\t\t\tequals 5\nsumConvert\t2+"3"\t\t\t\t\t\tequals 5\nsumInvalid\t2+"three"\t\t\t\t\tundefined`,
	}],
};