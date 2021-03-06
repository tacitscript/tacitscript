
export default {
	id: "bracketleft",
	symbol: "[",
	type: "Unary",
	sections: [{
		id: "first",
		type: "A?\tSS",
		examples: <React.Fragment>
			<span>{`firstArray\t[(5 6 7)\t\t\t\t\tequals 5\nfirstEArray\t[( )\t\t\t\t\t\tis `}
			<i>undefined</i></span>
			<span>{`\nfirstString\t["Hello, World!"\t\t\t\tequals "H"\nfirstEString\t[""\t\t\t\t\t\tis `}
			<i>undefined</i></span>
		</React.Fragment>,
	}],
};