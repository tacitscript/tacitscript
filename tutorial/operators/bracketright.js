
export default {
	id: "bracketright",
	symbol: "]",
	type: "Unary",
	sections: [{
		id: "last",
		type: "A?\tSS",
		examples: <React.Fragment>
			<span>{`lastArray\t](5 6 7)\t\t\t\t\tequals 7\nlastEArray\t]( )\t\t\t\t\t\tis `}
			<i>undefined</i></span>
			<span>{`\nlastString\t]"Hello, World!"\t\t\t\tequals "!"\nlastEString\t]""\t\t\t\t\t\tis `}
			<i>undefined</i></span>
		</React.Fragment>,
	}],
};