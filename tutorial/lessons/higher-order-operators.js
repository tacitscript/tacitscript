import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import Table from "../components/table.js";

const fToC = value => (value - 32) / 9 * 5;

export default {
	id: "higher-order-operators",
	name: "Higher Order Operators",
	operations: <React.Fragment><a href="#reduce">($) reduce</a></React.Fragment>,
	description: <div>
		<p><a href="#pipe">(.) pipe</a> is an example of a <i>higher order</i> operator; one that takes other operators as arguments.</p>
		<p>The <a href="#dollar">dollar ($)</a> operator represents a group of operations that <i>join</i> elements together.</p>
		<p><a href="#reduce">($) reduce</a> inserts the left-hand binary operation between each element of the array on the right.</p>
		<div className="code-block">{getOperationExamples([
			["sum", "+$(3 4 5)", "equals 12"],
		])}</div>
		<p>A variation is to provide a starting value alongside the operator on the left.</p>
		<div className="code-block">{getOperationExamples([
			["sumOnTwo", "(+ 2)$(3 4 5)", "equals 14"],
		])}</div>
		<p>As well as building values this way, we can construct algorithms from arrays of operators.</p>
	</div>,
	exercise: {
		question: <div>
			<div>Define the higher order operator <b>chain</b> such that:</div>
		</div>,
		getJs: ({def}) => `/*ts
chain		${def}
solution	chain(-32 /9 *5)
*/`,
		getHtml: details => <p><Table className="multiple-line">{[
			[<div className="name">chain</div>, <TextEdit {...{...details, solution: ".$"}}/>],
			[<div className="name">fToC</div>,<div className="expression">chain(-32 /9 *5)</div> ],
		]}</Table></p>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 99) + 1, 2),
		hint1: "Use operators: $ .",
		hint2: "pipe reduce",
		tests: [
			{description: "chain(-32 /9 *5) gives a unary operator (fToC)", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>fToC</b>{`${testValue} equals ${toDecimalPlaces(fToC(testValue), 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(solution(testValue) - fToC(testValue)) < 1E-10},
		],
	},
};