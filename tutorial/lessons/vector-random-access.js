import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const medianOfThree = R.pipe(R.sortBy(R.identity), R.nth(1));

export default {
	id: "vector-random-access",
	name: "Vector Random Access",
	operations: <React.Fragment><a href="#at">(') at</a></React.Fragment>,
	description: <div>
		<p>Vectors (arrays and strings) allow fast access to any element via the <a href="#at">(') at</a> operation.</p>
		<p>Elements are accessed via zero-based indexing. An invalid index will return <i>undefined</i>.</p>
		<div className="code-block">{getOperationExamples([
			["2'(3 5 7 9)=8"],
			[`5'"hello"=(0/0)`]
		])}</div>
		<p>Note that negative indexes are also supported (from the end of the vector.)</p>
		<div className="code-block">_2'"goodbye"="y"</div>
	</div>,
	exercise: {
		question: <div>Define the operator <b>medianOfThreeAN</b> that takes an array of three numbers, arranges the elements in order, and returns the middle one:</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">medianOfThreeAN</div>
			<TextEdit {...{...details, multiline: true, solution: ";<.1'"}}/>
		</div>,
		hint1: "Use operators: . ; < '",
		hint2: "sort then take the second element",
		getTestValues: () => R.times(() => R.times(() => Math.floor(Math.random() * 10), 3), 2),
		tests: [
			...R.times(() => ({description: testValue => <span><b>medianOfThreeAN</b>{`${ts.toString(testValue)}`} equals {medianOfThree(testValue)}</span>, condition: ({solution, testValue}) => JSON.stringify(medianOfThree(testValue)) === JSON.stringify(solution(testValue))}), 2),
			{description: <span><b>medianOfThreeAN</b> uses <a href="#apostrophe">apostrophe (')</a></span>, condition: ({es6}) => es6.includes("ts.apostrophe")},
		],
	},
};