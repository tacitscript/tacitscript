import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const minimums = R.map(([a, b]) => (a < b) ? a : b);

export default {
	id: "comparatives",
	name: "Comparatives",
	operations: <React.Fragment><a href="#lessThan">(&lt;) lessThan</a>, <a href="#greaterThan">(&gt;) greaterThan</a></React.Fragment>,
	description: <div>
		<p>In addition to <a href="#equality">(=) equality</a>, tacitscript supports the standard comparatives <a href="#lessThan">(&lt;) lessThan</a> and <a href="#greaterThan">(&gt;) greaterThan</a>.</p>
		<p>Although <span className="code">=</span> compares any value types, <span className="code">&lt;</span> and <span className="code">&gt;</span> only support comparison of numbers and strings.</p>
		<div className="code-block">1&lt;2=!()</div>
		<p>Strings are compared by the <a href="https://en.wikipedia.org/wiki/Unicode_collation_algorithm" target="_blank" rel="noopener,noreferrer">unicode collation algorithm</a>, which is similar to dictionary order, except that upper and lower case letters are distinct, and order is determined by <a href="https://en.wikipedia.org/wiki/Code_point" target="_blank" rel="noopener,noreferrer">unicode codepoints</a>.</p>
		<div className="code-block">"Brian"&gt;"amy"=()</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>minimumsAA</b> that takes an array of pairs of numbers, and returns the minimums of each pair:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">minimumsAA</div>
			<TextEdit {...{...details, multiline: true, solution: '((<$ [) ])?@'}}/>
		</div>,
		getTestValues: () => [R.pipe(R.times(() => Math.floor(Math.random() * 10)), R.splitEvery(2))(10)],
		hint1: "Use operators: $ @ [ ] < ?",
		hint2: "map checking if the first of pair is less than the second, selecting appropriately",
		tests: [
			{description: testData => <span><b>minimumsAA</b>{`${ts.toString(testData)} equals ${ts.toString(minimums(testData))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(minimums(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>minimumsAA</b> uses the <a href="#less">less (&lt;)</a> or <a href="#greater">greater (&gt;)</a> operator</span>, condition: ({es6}) => es6.includes("ts.less") || es6.includes("ts.greater")},
		],
	},
};