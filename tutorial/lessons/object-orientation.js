import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import Quotation from "../components/quotation.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const bounds = `:.(
					(].="width" [.(1' ]).-$)
					(].="height" [.(2' [).-$)
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
		<p>In mathematics, complex numbers have freely varying real and imaginary parts. We can model this as an array of two numbers.</p>
		<div className="code-block">{getOperationExamples([
			["complexA", `(3 4)`, <span>represents <span className="code">3 + 4i</span></span>],
		])}</div>
		<p>There are advantages to representing complex numbers in this way. We have at our disposal the full range of array operators.</p>
		<Quotation>It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures.
-- Alan Perlis - Epigrams on Programming (1982)
		</Quotation>
		<p>However, it is often advantageous to bind specialized data structures with the functionality commonly used to process them. We may, for instance, want an easy way to extract the real or imaginary part from our complex number representation (without having to remember how the data is internally organized.) Or to easily calculate the magnitude of the number.</p>
		<p>Data bound with associated functionality (methods), is known as an <i>object</i>. When an <i>object</i> is instantiated, we return an interface exposing its supported methods.</p>
		<p>We can implement this through <i>message passing</i>.</p>
		<div className="code-block">{getOperationExamples([
			["complexASN", `:.(
				(].="real" [.[)
				(].="imag" [.])
				(].="mag" [.^2@.+$.^0.5)
				()\`
			)?`],
			["exampleSN", "(3 4)complexASN"],
			["realN", `exampleSN"real"`, "equals 3"],
			["magN", `exampleSN"mag"`, "equals 5"],
			["unknownO", `exampleSN"unknown"`, "equals ()"],
		])}</div>
		<p>An alternative implementation exposes the object's interface through a dictionary.</p>
		<div className="code-block">{getOperationExamples([
			["complexAD", `.(
				.("real"\` [)
				.("imag"\` ])
				.("mag"\` ^2@.+$.^0.5)
			).\\`],
			["exampleD", "complexAD(3 4)"],
			["realN", `"real"'exampleD`, "equals 3"],
			["magN", `"mag"'exampleD`, "equals 5"],
			["unknownO", `"unknown"'exampleD`, "equals ()"],
		])}</div>
		<p>Note the difference in behaviour. Here we precalculate the response and so trade construction speed for execution speed on method call.</p>
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
			[<div className="name">boundsASN</div>, <TextEdit {...{...details, solution: bounds}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - = . $ ] [ ' ? :",
		hint2: "Pair the array and method call, cond the options remembering default implementation for unknown methods",
		getTestValues: () => [R.map(R.pipe(R.times(Math.random), R.map(R.pipe(R.multiply(10), Math.floor)), R.sortBy(R.identity), ([a, b, c, d]) => [a, d, c, b]))([4, 4, 4])],
		tests: [
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"width" equals {boundsASN(details, "width")}</span>, condition: ({solution, testValue}) => boundsASN(testValue, "width") === solution(testValue, "width")},

		],
	},
};