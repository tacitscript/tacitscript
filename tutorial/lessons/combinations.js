import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const es6 = ts2es6(`/*ts
	factGenNN			+1^.*$
	combinations		:.(].factGenNN .([ _.-$).factGenNN@.*$)./$.0'
*/`);
eval(es6.replace(/const /g, "var "));

const testValues = R.map(R.reverse, [[86, 78],
	[67, 8],
	[87, 8],
	[105, 7],
	[51, 41],
	[72, 8],
	[92, 7]]);

export default {
	id: "combinations",
	name: "Combinations",
	exercise: {
		question: <div>
			<div>The number of ways you can select <b>k</b> objects from a set of <b>n</b> is given by the formula <a href="https://en.wikipedia.org/wiki/Combination" target="_blank"><b>n!/(k!(n-k)!)</b></a>.</div>
			<p>Define the operator <b>combinationsNNN</b> that takes <b>k</b> to the left, <b>n</b> to the right, and reuses your previous work on <a href="#generating-sequences">factorials</a>.</p>
			<p>The factorial of <b>k</b> and <b>n</b> will both be containable within 64-bit floating point numbers. Division of floating point numbers may give inexact values, so you should round answers to the nearest integer.</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		factGenNN ${solutions["generating-sequences"].def}
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">factGenNN</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#generating-sequences">Please solve this first</a>)(details.solutions["generating-sequences"])],
			[<div className="name">combinationsNNN</div>, <TextEdit {...{...details, solution: ":.(].factGenNN .([ _.-$).factGenNN@.*$)./$.0'", disabled: (({def, pass}) => !def || !pass)(details.solutions["generating-sequences"] || {})}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - * / _ . $ @ : ] [ '",
		hint2: "Pair, then apply factGenNN to k, n and the difference, combining the values appropriately",
		getTestValues: () => [R.pipe(R.sortBy(Math.random), R.head)(testValues)],
		tests: [
			{description: testValue => <span>{testValue[0]}<b>combinationsNNN</b>{`${testValue[1]} equals ${combinations(...testValue)}`}</span>, condition: ({solution, testValue}) => combinations(...testValue) === solution(...testValue)},
			{description: () => <span><b>combinationsNNN</b> uses <b>factGenNN</b></span>, condition: ({def}) => def.includes("factGenNN")},
		],
	},
};