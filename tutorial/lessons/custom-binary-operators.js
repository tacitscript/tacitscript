import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";

const multipleOf = (dividend, divisor) => ((dividend % divisor) < 1e-10) ? 1 : 0;

export default {
	id: "custom-binary-operators",
	name: "Custom Infix Operations",
	operations: <React.Fragment><a href="#binaryUnaryPipe">(.) binaryUnaryPipe</a></React.Fragment>,
	description: <div>
		<p>Custom infix operations can be created by piping from existing infix operations.</p>
		<p><a href="#binaryUnaryPipe">(.) binaryUnaryPipe</a> takes an infix operation to the left, passing its result to the prefix operation on the right.</p>
		<p>The binary operation defined below calculates the average of it's two arguments.</p>
		<div className="code-block">{getOperationExamples([
			["average", "+./2", "2average5=3.5"],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the infix operation <b>multipleOf</b> that determines whether the number of the left is a multiple of the number on the right:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">multipleOf</div>
			<TextEdit {...{...details, multiline: true, solution: '%.=0'}}/>
		</div>,
		getTestValues: () => R.pipe(R.times(Math.random), R.addIndex(R.map)((x, index) => (factor => [Math.floor(Math.random() * 11 + 2) * factor + index, factor])(Math.floor(x * 11 + 2))), R.sortBy(Math.random))(2),
		hint1: "Use operators: = . %",
		hint2: "remainder then check if 0",
		tests: R.times(() => ({
			description: ([dividend, divisor]) => <span>{dividend}<b>multipleOf</b>{`${divisor} equals ${ts.toString(multipleOf(dividend, divisor))}`}</span>,
			condition: ({solution, testValue}) => multipleOf(...testValue) === solution(...testValue),
		}), 2),
	},
};