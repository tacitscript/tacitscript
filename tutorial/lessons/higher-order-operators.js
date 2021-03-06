import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const fToC = value => (value - 32) / 9 * 5;

export default {
	id: "higher-order-operators",
	name: "Higher Order Operators",
	description: <div>
		<p>Higher order operators take other operators as arguments.</p>
		<p>The <a href="#dollar">dollar ($)</a> operator represents a group of operations that <i>join</i> elements together.</p>
		<p><a href="#reduce">($) reduce</a> inserts the left-hand binary operation between each element of the array on the right.</p>
		<div className="code-block">{getOperationExamples([
			["sum", "+$(3 4 5)", "equals 12"],
		])}</div>
		<p>Another version of <a href="#reduce">($) reduce</a> takes an array to the left, comprising of a binary operator and a starting value.</p>
		<div className="code-block">{getOperationExamples([
			["changeFromPound", "(- 100)$(50 20 5)", "equals (100-50-20-5)=25"],
		])}</div>
		<p>As well as building a values this way, we can construct algorithms from arrays of operators.</p>
	</div>,
	exercise: {
		question: <div>
			<div>Define the higher order operator <b>chain</b> such that:</div>
		</div>,
		getJs: def => `/*ts
chain		${def}
solution	chain(-32 /9 *5)
*/`,
		getHtml: details => <div className="single-line"><div className="name-expression">
		<div className="name">chain</div>
			<TextEdit {...{...details, solution: ".$"}}/>
		</div><div className="name-expression">
			<div className="name">fToC</div>
			<div className="expression">chain(-32 /9 *5)</div>
		</div></div>,
		getTestValue: () => Math.floor(Math.random() * 99) + 1,
		tests: [
			{description: "chain(-32 /9 *5) gives a unary operator (fToC)", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>fToC</b>{`${testValue} equals ${toDecimalPlaces(fToC(testValue), 4)}`}</span>, condition: ({solution, testValue}) => {
				if (typeof solution !== "function") return false;

				try {
					return Math.abs(solution(testValue) - fToC(testValue)) < 1E-10;
				} catch (ex) {
					return false;
				}
			}},
		],
	},
};