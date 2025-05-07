import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const isEven = x => ((x % 2) < 1e-10) ? 1 : 0;

export default {
	id: "remainders",
	name: "Remainders",
	operations: <React.Fragment><a href="#remainder">(%) remainder</a></React.Fragment>,
	description: <div>
		<p><a href="#remainder">(%) remainder</a> takes numbers to the left and right, and returns the remainder after division.</p>
		<div className="code-block">11%3=2</div>
		<p>Negative values are supported. Note that the remainder will always have the same sign as the dividend.</p>
		<div className="code-block">_10%3=(_1)</div>
	</div>,
	exercise: {
		question: <span>Define the operation <b>isEven</b> that takes an integer and returns whether the number is even:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">isEven</div>
			<TextEdit {...{...details, multiline: true, solution: '%2.=0'}}/>
		</div>,
		getTestValues: () => R.pipe(R.times(Math.random), R.addIndex(R.map)((x, index) => (Math.floor(x * 500) * 2) + index), R.sortBy(Math.random))(2),
		hint1: "Use operators: = . %",
		hint2: "remainder from 2, check if 0",
		tests: [
			...R.times(() => ({
				description: testData => <span><b>isEven</b>{`${testData} equals ${ts.toString(isEven(testData))}`}</span>,
				condition: ({solution, testValue}) => isEven(testValue) === solution(testValue),
			}), 2),
			{description: () => <span><b>isEven</b> uses the <a href="#percent">percent (%)</a> operator</span>, condition: ({es6}) => es6.includes("ts.percent")},
		],
	},
};