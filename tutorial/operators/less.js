
export default {
	id: "less",
	symbol: "<",
	type: "Binary",
	sections: [{
		id: "lessThan",
		type: "NNB\tSSB",
		examples: <React.Fragment>
			<span>numberLess      2&lt;3                                             is <i>true</i></span>
			<span>stringLess      "cad"&lt;"bad"                                     is <i>false</i></span>
		</React.Fragment>,
	}],
};