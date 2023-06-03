import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const es6 = ts2es6(`/*ts
	wholeNumberNT		.(; [).-$.!
*/`);
eval(es6.replace(/const /g, "var "))

export default {
	id: "not",
	name: "NOT",
	operations: <React.Fragment><a href="#notValue">(!) notValue</a></React.Fragment>,
	description: <div>
		<p>The <a href="#filtering">truthiness</a> of any value can be inverted through the <a href="#notValue">(!) notValue</a> operator.</p>
		<div className="code-block">{getOperationExamples([
			["!5=0"],
			['!""=1'],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the operator <b>wholeNumberNT</b> the takes any number and returns whether it is whole.</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">wholeNumberNT</div>, <TextEdit {...{...details, solution: ".(; [).-$.!"}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - . $ ; [ !",
		hint2: "Subtract rounded value and determine if truthy",
		getTestValues: () => R.pipe(R.times(Math.random), R.map(R.multiply(10)), R.over(R.lensPath([0]), Math.round), R.sortBy(Math.random))(2),
		tests: [
			...R.times(() => ({description: testValue => <span><b>wholeNumberNT</b>{`${testValue.toFixed(2)} equals ${ts.toString(wholeNumberNT(testValue))}`}</span>, condition: ({solution, testValue}) => wholeNumberNT(testValue) === solution(testValue)}), 2),
			{description: () => <span><b>wholeNumberNT</b> uses the <a href="#bang">bang (!)</a> operator</span>, condition: ({def}) => def.includes("!")},
		],
	},
};