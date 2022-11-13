import TextEdit from "../components/text-edit.js";

export default {
	id: "increment-numeric-string",
	name: "Increment Numeric String",
	exercise: {
		question: <div>
			<div>Define the operator <b>increment</b> that increments a numeric string:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">increment</div>
			<TextEdit {...{...details, multiline: true, solution: `0+.+1.""+`}}/>
		</div>,
		getTestValue: index => `${(Math.floor(Math.random() * 1000) * (index ? 1 : -1)) / 10}`,
		hint1: "Use operators: . +",
		hint2: "convert to number, increment, convert to string",
		tests: [
			{description: testValue => <span><b>increment</b>"{`${testValue.replace(/-/, "_")}" equals "${(+testValue + 1).toFixed(1)}"`}</span>, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue).replace(/_/, "-") - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
			{description: testValue => <span><b>increment</b>"{`${testValue}" equals "${(+testValue + 1).toFixed(1)}"`}</span>, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue) - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
		],
	},
};