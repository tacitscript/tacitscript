
export default {
	id: "slash",
	symbol: "/",
	type: "Binary",
	sections: [{
		id: "divide",
		type: "NNN",
		examples: <React.Fragment>
			<span>{`quotient\t5/2\t\t\t\t\t\tequals 2.5\ndivideByZero\t5/0\t\t\t\t\t\t`}
			<i>undefined</i></span>
		</React.Fragment>,
	}],
};