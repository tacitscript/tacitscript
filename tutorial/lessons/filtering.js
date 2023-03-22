import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const array = ["string", false, {a: 1}, [], true, 1, "", [1, 2], {}, 0];
const shuffle = R.sortBy(() => Math.random());
const compact = R.filter(ts.isTruthy);

export default {
	id: "filtering",
	name: "Filtering",
	operations: <React.Fragment><a href="#filter">(?) filter</a></React.Fragment>,
	description: <div>
		<p>The <a href="#filter">(?) filter</a> operation takes a condition to the left and array to the right, and removes any elements of the array that do not pass the conditional check.</p>
		<div className="code-block">&gt;5?(6 2 4 8 9)=(6 8 9)</div>
		<p>Note the conditional can return any type, and <i>truthiness</i> is determined based on the following rules:</p>
		<ul>
			<li><span className="code">()</span>, <i>undefined</i>, and emtpy strings/arrays/dictionaries (ie. <span className="code">"" ( ) \( )</span>) are <b>falsey</b></li>
			<li>all other types are <b>truthy</b></li>
		</ul>
		<p>Note, in particular, <b>0</b> is <i>truthy</i>.</p>
	</div>,
	exercise: {
		question: <span>Define the operator <b>compactAA</b> that takes an array and removes all <i>falsey</i> elements:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">compactAA</div>
			<TextEdit {...{...details, multiline: true, solution: ';?'}}/>
		</div>,
		getTestValues: () => [shuffle(array)],
		hint1: "Use operators: ; ?",
		hint2: "identity-filter",
		tests: [
			{description: testValue => <span><b>compactAA</b>{`${ts.toString(testValue)} equals ${ts.toString(compact(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(compact(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>compactAA</b> uses the <a href="#question">question (?)</a> operator</span>, condition: ({es6}) => es6.includes("ts.question")},
		],
	},
};