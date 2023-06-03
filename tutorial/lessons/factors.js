import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const factors = ".(:./$.wholeNumberNT +1^).?$";

const es6 = ts2es6(`/*ts
	wholeNumberNT		.(; [).-$.!
	factorsNA			${factors}
*/`);
eval(es6.replace(/const /g, "var "));

export default {
	id: "factors",
	name: "Factors",
	exercise: {
		question: <div>
			<div>Define the operator <b>factorsNA</b> that takes an integer and returns all factors (including <b>1</b> and the number itself.)</div>
			<p>Reuse your work on whole number determination. (A naive implementation that searches all possibilities is acceptable - test values will be less than 100.)</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		wholeNumberNT ${solutions["not"].def}
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">wholeNumberNT</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#not">Please solve this first</a>)(details.solutions["not"])],
			[<div className="name">factorsNA</div>, <TextEdit {...{...details, solution: factors, disabled: (({def, pass}) => !def || !pass)(details.solutions["not"] || {})}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: + / . $ ? ^ : wholeNumberNT",
		hint2: "Fork to create condition where division yields whole number and array of all numbers up to value. Then filter-reduce.",
		getTestValues: () => R.times(R.pipe(Math.random, R.multiply(100), Math.floor), 5),
		tests: [
			...R.times(() => ({description: testValue => <span><b>factorsNA</b>{`${testValue} equals ${ts.toString(factorsNA(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(factorsNA(testValue)) === JSON.stringify(solution(testValue))}), 5),
			{description: () => <span><b>factorsNA</b> uses <b>wholeNumberNT</b></span>, condition: ({def}) => def.includes("wholeNumberNT")},
		],
	},
};