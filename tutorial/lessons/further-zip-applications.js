import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const sequence = ([a, b, n]) => R.times(m => a + m * b, n);

export default {
	id: "further-zip-applications",
	name: "Further Zip Applications",
	operations: <React.Fragment><a href="#zipApplyTo">(,) zipApplyTo</a>, <a href="#unaryZipPipe">(,) unaryZipPipe</a></React.Fragment>,
	description: <div>
		<p><a href="#comma">comma (,)</a> before an array represent a zipping pipe/application operation.</p>
		<p>In addition to <a href="#reject">(,) binaryZipPipe</a> detailed above, there are a couple of other variations.</p>
		<p>The <a href="#zipApplyTo">(,) zipApplyTo</a> operation takes two arrays and performs a pairwise application. This is essentially the same as <span className="code">*.(,$)@</span></p>
		<div className="code-block">(3 6),(-1 +1)=(2 7)</div>
		<p>The <a href="#unaryZipPipe">(,) unaryZipPipe</a> operation take a unary operation on the left, the result of which is piped into the operations within the array on the right.</p>
		<p>The following example calculates a point on a line given by the equation <span className="code">y = mx + c</span> given input array <span className="code">(m x c)</span>.</p>
		<div className="code-block">{getOperationExamples([
			["yAN", "2%,(*$ [).+$", "yAN(2 3 4)=10"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>An <a href="https://en.wikipedia.org/wiki/Arithmetic_progression">arithmetic progression</a> is a sequence of numbers, starting at a number <b>a</b> and increasing by increments of <b>b</b>.</div>
			<p>The <i>nth</i> term of an arithmetic progression is given by <span className="code">a + (n - 1)b</span>.</p>
			<p>Define <b>sequenceAA</b> that takes an array <span className="code">(a b n)</span> and returns the first <b>n</b> terms of the associated arithmetic progression:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">sequenceAA</div>
			<TextEdit {...{...details, multiline: true, solution: '1%,([.+ ,(* ;).^$).@$'}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 10), 3)],
		hint1: "Use operators: + * , . $ @ ; ^ % [",
		hint2: "Split at 1, generate a sequence from the last two number and add the first number to each term",
		tests: [
			{description: testValue => <span><b>sequenceAA</b>{`${ts.toString(testValue)} equals ${ts.toString(sequence(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(sequence(testValue)) === JSON.stringify(solution(testValue))},
			{description: <span><b>sequenceAA</b> uses <a href="#comma">comma (,)</a></span>, condition: ({es6}) => es6.includes("ts.comma")},
		],
	},
};