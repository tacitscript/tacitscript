import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const start = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const isShuffled = result => (startString => (startString !== JSON.stringify(result)) && (startString === JSON.stringify(R.sortBy(R.identity, result))))(JSON.stringify(start));

export default {
	id: "random",
	name: "Random Numbers",
	operations: <React.Fragment><a href="#random">(?) random</a></React.Fragment>,
	description: <div>
		<p>The <a href="#random">(?) random</a> operation takes a natural number (positive integer) <b>n</b> to the right and, when called with any left argument, returns a random number.</p>
		<ul>
			<li>if <b>n = 1</b>, it returns a floating point number in the range [<b>0</b>, <b>1</b>) ie. the range includes <b>0</b> but excludes <b>1</b>,</li>
			<li>otherwise, it returns an integer in the range [<b>0</b>, <b>n - 1</b>]</li>
		</ul>
		<div className="code-block">{getOperationExamples([
			["randProportionVN", "?1", "0(<|=)(randProportionVN())<1"],
			["randDiceRollVN", "?6.+1", "1(<|=)(randDiceRollVN())(<|=)6"],
		])}</div>
		<p>Here, it might appear that <span className="code">randProportionVN()</span> is a function invocation. Infact, we are just applying <i>undefined</i>, <span className="code">()</span>, to a prefix operator to get a number. The value we pass is unimportant.</p>
		<p>Note that <a href="#random">(?) random</a> is <b>not</b> <a href="https://en.wikipedia.org/wiki/Referential_transparency" target="_blank">referentially transparent</a>.</p>
	</div>,
	exercise: {
		question: <span>Define the operator <b>shuffleAA</b> that takes an array and returns an array containing the same contents, but with the order of elements shuffled:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">shuffleAA</div>
			<TextEdit {...{...details, multiline: true, solution: '?1<'}}/>
		</div>,
		getTestValues: () => [start],
		hint1: "Use operators: < ?",
		hint2: "Sort by generating a different random number for each element",
		tests: [
			{description: testValue => <span><b>shuffleAA</b>{`${ts.toString(testValue)} contains the values 1 thru 9 in random order`}</span>, condition: ({solution, testValue}) => isShuffled(solution(testValue))},
			{description: () => <span><b>shuffleAA</b> uses the <a href="#question">question (?)</a> operator</span>, condition: ({es6}) => es6.includes("ts.question")},
		],
	},
};