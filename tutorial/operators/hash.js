
export default {
	id: "hash",
	symbol: "#",
	type: "Unary",
	sections: [{
		id: "length",
		type: "AN SN ON",
		examples: `lengthArray\t#(5 6 7)\t\t\t\t\tequals 3\nlengthEArray\t#( )\t\t\t\t\t\tequals 0\n\nlengthString\t#"Hello, World!"\t\t\t\tequals 13\nlengthEString\t#""\t\t\t\t\t\tequals 0`,
	}],
};