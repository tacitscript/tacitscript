
export default {
	id: "apostrophe",
	symbol: "'",
	type: "Binary",
	sections: [{
		id: "at",
		type: "NA? NSS",
		examples: <React.Fragment>
			<span>{`elemArray\t1'(5 6 7)\t\t\t\t\tequals 6\nelemEArray\t0'( )\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemOOBArray\t3'(5 6 7)\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemNegArray\t_1'(5 6 7)\t\t\t\t\tequals 7\n\nelemString\t1'"Hello, World!"\t\t\t\tequals "e"\nelemEString\t0'""\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemOOBString\t13'"Hello, World!\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemNegString\t_1'"Hello, World!"\t\t\t\tequals "!"`}</span>
		</React.Fragment>,
	}],
};