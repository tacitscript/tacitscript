import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "apostrophe",
	symbol: "'",
	type: "Infix",
	sections: [{
		id: "at",
		type: "NA?\tNSS",
		examples: getOperationExamples([
			["elemArray", "1'(5 6 7)", "equals 6"],
			["elemEmptyArray", `0'( )`, <span>is <i>undefined</i></span>],
			["elemOOBArray", "3'(5 6 7)", <span>is <i>undefined</i></span>],
			["negElemArray", `_1'(5 6 7)`, "equals 7 (wrap around)"],
			[<br/>],
			["elemString", `1'"Hello, World!"`, `equals "e"`],
			["elemEmptyString", `0'""`, <span>is <i>undefined</i></span>],
			["elemOOBString", `13'"Hello, World!`, <span>is <i>undefined</i></span>],
			["negElemString", `_1'"Hello, World!"`, `equals "!" (wrap around)`],
		]),
	}],
};