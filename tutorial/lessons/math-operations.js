import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "k",
	name: "Math Operations",
	description: <div>
		<p><a href="#power">^ (power)</a> raises its left argument to the power of its right.</p>
		<div className="code-block">{getOperationExamples([
			["square", "^2", "square3=9"],
		])}</div>
		<p><a href="#modulo">% (modulo)</a> returns the remainer of dividing its left argument by its right. (The result will have the same sign as the left argument.)</p>
		<div className="code-block">{getOperationExamples([
			["remainder", "7%2", "equals 1"],
		])}</div>
	</div>,
};