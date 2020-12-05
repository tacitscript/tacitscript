
export default {
	id: "equals",
	symbol: "=",
	type: "Binary",
	sections: [{
		id: "equality",
		type: "VVB",
		examples: <React.Fragment>
			<span>deepCheck       ("abc" (1 2 3))=("abc" (1 2 4))                 is <i>false</i></span>
			<span>mixedType       "string"=4                                      is <i>false</i></span>
			<span>fnInclusion     (2* 1)=(2* 1)                                   is <i>undefined</i> (cannot compare operators)</span>
		</React.Fragment>,
	}],
};