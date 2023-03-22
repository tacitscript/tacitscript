import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const start = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const isShuffled = result => (startString => (startString !== JSON.stringify(result)) && (startString === JSON.stringify(R.sortBy(R.identity, result))))(JSON.stringify(start));

export default {
	id: "random",
	name: "Random Numbers",
	operations: <React.Fragment><a href="#random">(?) random</a>, <a href="#orComparator">(|) orComparator</a></React.Fragment>,
	description: <div>
		<p>The <a href="#random">(?) random</a> operation takes two numbers (<b>left</b> and <b>right</b>) and returns a random number in the range [<b>left</b>, <b>right</b>) ie. the range includes <b>left</b> but excludes <b>right</b>.</p>
		<div className="code-block">{getOperationExamples([
			["randomN", "0?1", "0(<|=)randomN<1"],
		])}</div>
		<p>Note that <a href="#random">(?) random</a> is <b>not</b> <a href="https://en.wikipedia.org/wiki/Referential_transparency" target="_blank">referentially transparent</a>.</p>
	</div>,
	exercise: {
		question: <span>Define the operator <b>shuffleAA</b> that takes an array and returns an array containing the same contents, but with the order of elements shuffled:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">shuffleAA</div>
			<TextEdit {...{...details, multiline: true, solution: '(0`.?1)<'}}/>
		</div>,
		getTestValues: () => [start],
		hint1: "Use operators: . ` < ?",
		hint2: "Sort by generating a different random number for each element",
		tests: [
			{description: testValue => <span><b>shuffleAA</b>{`${ts.toString(testValue)} contains the values 1 thru 9 in random order`}</span>, condition: ({solution, testValue}) => isShuffled(solution(testValue))},
			{description: () => <span><b>shuffleAA</b> uses the <a href="#question">question (?)</a> operator</span>, condition: ({es6}) => es6.includes("ts.question")},
		],
	},
};