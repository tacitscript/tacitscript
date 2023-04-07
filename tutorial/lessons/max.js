import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const minMax = array => [Math.min.apply(Math, array), Math.max.apply(Math, array)];

export default {
	id: "maximum",
	name: "Forking 2",
	operations: <React.Fragment><a href="#pipeToArray">(.) pipeToArray</a></React.Fragment>,
	description: <div>
		<p>We can use the <a href="#dot">dot (.)</a> operator in a very similar way to <a href="#applyToArry">(.) applyToArray</a>, but fork the calculation inside a pipeline rather than forking the value itself.</p>
		<p><a href="#pipeToArray">(.) pipeToArray</a> takes a unary operator on the left, and array on the right. It takes the value processed by the operator on the right and forks it to every operator contained in the array on the right.</p>
		<p>The following example increments a number then returns half and double the result:</p>
		<div className="code-block">{getOperationExamples([
			["incrHalfDoubNA", "+1.(/2 *2)", "incrHalfDoubNA3=(2 8)"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Using the <a href="#sort">(&lt;) sort</a> operation introduced previously, define the operator <b>minMaxAA</b> that takes an array of numbers and returns the minimum and maximum value:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">minMaxAA</div>
			<TextEdit {...{...details, multiline: true, solution: `;<.([ ])`}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 19) - 9, 10)],
		hint1: "Use operators: . ; ] [ <",
		hint2: "identity-sort then first and last",
		tests: [
			{description: testValue => <span><b>minMaxAA</b>{`${ts.toString(testValue)} equals ${ts.toString(minMax(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(minMax(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>minMaxAA</b> uses <a href="#less">less (&lt;)</a></span>, condition: ({es6}) => es6.includes("ts.less")},
		],
	},
};