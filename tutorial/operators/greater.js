
export default {
	id: "greater",
	symbol: ">",
	type: "Binary",
	sections: [{
		id: "greaterThan",
		type: "NNB\tSSB",
		examples: <React.Fragment>
			<span>numberGreater   2&gt;3                                             is <i>false</i></span>
			<span>stringGreater   "cad"&gt;"bad"                                     is <i>true</i></span>
		</React.Fragment>,
	}],
};