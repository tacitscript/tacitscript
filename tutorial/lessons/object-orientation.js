import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import Quotation from "../components/quotation.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const bounds = `:.(
	(].="widthN" [.(1' ]).-$)
	(].="heightN" [.(2' [).-$)
	()\`
)?`;
const es6 = ts2es6(`/*ts
	boundsASN		${bounds}
*/`);
eval(es6.replace(/const /g, "var "))

export default {
	id: "object-orientation",
	name: "Object Orientation",
	description: <div>
		<p>Object oriention is a programming paradigm that seeks to bind functionality to its associated data.</p>
		<p>We can model a 2D vector as an array of two numbers.</p>
		<div className="code-block">{getOperationExamples([
			["vectorA", `(3 4)`, <span>represents vector from origin to coordinate<span className="code">(3 4)</span></span>],
		])}</div>
		<p>There are advantages to representing vectors in this way. We have at our disposal the full range of array operators.</p>
		<Quotation>
			<div>It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures.</div>
			<div> -- Alan Perlis - Epigrams on Programming (1982)</div>
		</Quotation>
		<p>However, it is often advantageous to bind specialized data structures with the functionality commonly used to process them. We may, for instance, want an easy way to extract the x or y components from our vector representation (without having to remember how the data is internally organized.) Or to easily calculate the magnitude of the vector.</p>
		<p><i>Message passing</i> can be used to solve these use cases. When an <i>object</i> is instantiated from its data, we return an interface exposing its supported functionality (methods.)</p>
		<div className="code-block">{getOperationExamples([
			["vectorASN", `:.(
	(].="xN" [.[)
	(].="yN" [.])
	(].="magN" [.^2@.+$.^0.5)
	()\`
)?`],
			["exampleSN", "(3 4)vectorASN"],
			["xN", `exampleSN"xN"`, "equals 3"],
			["magN", `exampleSN"magN"`, "equals 5"],
			["unknownO", `exampleSN"unknown"`, "equals ()"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the operator <b>boundsASN</b> that takes an array of four numbers <span className="code">(top right bottom left)</span> and returns an interface supporting the messages <span className="code">width</span> and <span className="code">height</span>, such that:</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">boundsASN</div>, <TextEdit {...{...details, multiline: true, solution: bounds}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - = . $ ] [ ' ? :",
		hint2: "Pair the array and method call, cond the options remembering default implementation for unknown methods",
		getTestValues: () => R.map(R.pipe(R.times(Math.random), R.map(R.pipe(R.multiply(10), Math.floor)), R.sortBy(R.identity), ([a, b, c, d]) => [a, d, c, b]))([4, 4, 4]),
		tests: [
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"width" equals {boundsASN(details, "width")}</span>, condition: ({solution, testValue}) => boundsASN(testValue, "widthN") === solution(testValue, "widthN")},
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"height" equals {boundsASN(details, "height")}</span>, condition: ({solution, testValue}) => boundsASN(testValue, "heightN") === solution(testValue, "heightN")},
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"unknown" equals ()</span>, condition: ({solution, testValue}) => boundsASN(testValue, "unknown") === undefined},
		],
	},
};