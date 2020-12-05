
export default {
	id: "plus",
	symbol: "+",
	type: "Binary",
	sections: [{
		id: "add",
		type: "NVN",
		examples: <React.Fragment>
			<span>{`sum\t\t2+3\t\t\t\t\t\tequals 5\nsumConvert\t2+"3"\t\t\t\t\t\tequals 5\nsumInvalid\t2+"three"\t\t\t\t\t`}
			<i>undefined</i></span>
		</React.Fragment>,
	}, {
		id: "concat",
		type: "AAA   SVS",
		examples: `arrayConcat\t(1 2 3)+(2 3 4)\t\t\t\t\tequals (1 2 3 4 5 6)\n\nstringConcat\t"Hello, "+"World!"\t\t\t\tequals "Hello, World!"\n\
convertConcat\t"Array: "+(1 2 3)\t\t\t\tequals "Array: (1 2 3)"`,
	}],
};