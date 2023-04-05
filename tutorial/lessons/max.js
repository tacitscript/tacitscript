import TextEdit from "../components/text-edit.js";

const max = array => Math.max.apply(Math, array);

export default {
	id: "maximum",
	name: "Maximum",
	exercise: {
		question: <div>
			<div>Define the operator <b>maxAN</b> that takes an array of numbers and returns the one with highest value:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">maxAN</div>
			<TextEdit {...{...details, multiline: true, solution: `;<.]`}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 19) - 9, 10)],
		hint1: "Use operators: . ; ] <",
		hint2: "identity-sort then last",
		tests: [
			{description: testValue => <span><b>maxAN</b>{`${ts.toString(testValue)} equals ${ts.toString(max(testValue))}`}</span>, condition: ({solution, testValue}) => max(testValue) === solution(testValue)},
		],
	},
};