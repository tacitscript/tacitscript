import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "e",
	name: "Custom Operators",
	description: <div>
		<p>A new operator can be made by applying an operand to an existing infix operator.</p>
		<p>This generates a new prefix operator with that operand <i>baked-in</i>.</p>
		<div className="code-block">{getOperationExamples([
			["double", "2*"],
			["calculation", "double4", "equals 8"],
		])}</div>
		<p>You can also apply the operand to right side of an infix operator.</p>
		<div className="code-block">{getOperationExamples([
			["minusSix", "-6"],
			["calculation", "minusSix9", "equals 3"],
		])}</div>
		<p>Note that a prefix operator <i>always</i> takes its operand to the right. So <span className="code">9minusSix</span> is a syntax error, as is <span className="code">9(-6)</span>.</p>
		<p>Applying an operand to an infix operator can also be achieved with the <a href="#applyTo">(,) applyTo</a> operation. Note, that the operand is always applied to the left-hand side.</p>
		<div className="code-block">{getOperationExamples([
			["oneMinus", "1,-", "equivalent to 1-"],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>inverse</b> such that:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">inverse</div>
			<TextEdit {...{...details, multiline: true, solution: "1/"}}/>
		</div>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 99) + 1, 3),
		hint1: "Use operator: /",
		hint2: "one divide",
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>inverse</b>{`${testValue} equals ${toDecimalPlaces(1 / testValue, 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(solution(testValue) - (1 / testValue)) < 1E-10},
			{description: <span><b>inverse</b>0 is <i>undefined</i> (see below)</span>, condition: ({solution}) => solution(0) == undefined},
		],
	},
	epilogue: <div>
		<p><i>undefined</i> is a special value represented by <span className="code">()</span> within tacitscript.</p>
		<p>It is a <i>toxic value</i> in that, if applied to any operator where a defined value is required,
		the resulting calculation will also be <i>undefined</i>.</p>
		<div className="code-block">{getOperationExamples([
			["calculation", "1/0+2", <span>is <i>undefined</i></span>],
		])}</div>
	</div>,
};