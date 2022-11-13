import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "equals",
	symbol: "=",
	type: "Binary",
	sections: [{
		id: "equality",
		type: "VVB",
		examples: getOperationExamples([
			["deepCheck", `("abc" (1 2 3))=("abc" (1 2 4))`, <span>is <i>false</i> (deep <i>by-value</i> comparison)</span>],
			["mixedType", '"string"=4', <span>is <i>false</i></span>],
			["includeOperators", '(2* 1)=(2* 1)', <span>is <i>undefined</i> (cannot compare operators)</span>]
		]),
	}],
};