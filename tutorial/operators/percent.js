
export default {
	id: "percent",
	symbol: "%",
	type: "Binary",
	sections: [{
		id: "modulo",
		type: "NNN",
		examples: <React.Fragment>
			<span>fiveRemTwo      5%2                                                equals 1</span>
			<span>negativeRem     _8%3                                               equals -2 (result shares sign with left side)</span>
			<span>invalidRem      7%0                                                is <i>undefined</i></span>
		</React.Fragment>,
	}],
};