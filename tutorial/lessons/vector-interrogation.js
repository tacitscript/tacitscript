import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "g",
	name: "Vector Interrogation",
	description: <div>
		<p>Arrays and strings share many common operations, and are collectively termed <b>vectors</b>.</p>
		<p><a href="#length"># (length)</a> retrieves the length of a vector.</p>
		<div className="code-block">{getOperationExamples([
			["lengthArray", "#(5 6 7)", "equals 3"],
			["lengthString", '#"Hello, World!"', "equals 13"],
		])}</div>
		<p><a href="#first">[ (first)</a> retrieves the first element of a vector.</p>
		<div className="code-block">{getOperationExamples([
			["firstArray", "[(5 6 7)", "equals 5"],
			["firstString", '["Hello, World!"', 'equals "H"'],
		])}</div>
		<p><a href="#last">] (last)</a> retrieves the last element of a vector.</p>
		<div className="code-block">{getOperationExamples([
			["lastArray", "](5 6 7)", "equals 7"],
			["lastString", ']"Hello, World!"', 'equals "!"'],
		])}</div>
		<p><a href="#at">' (at)</a> retrieves the element at a zero-based index of a vector. Negative indices count back from the end of the vector.</p>
		<div className="code-block">{getOperationExamples([
			["elemArray", "1'(5 6 7)", "equals 6"],
			["elemString", `1'"Hello, World!"`, 'equals "e"'],
		])}</div>
	</div>,
};