import TextEdit from "../components/text-edit.js";

export default {
	id: "average",
	name: "Average",
	operations: <React.Fragment><a href="#applyToArray">(.) applyToArray</a>, <a href="#length">(#) length</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>averageAN</b> that takes an array of numbers and returns the arithmetic mean:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">averageAN</div>
			<TextEdit {...{...details, multiline: true, solution: `.(+$ #)./$`}}/>
		</div>,
		getTestValue: index => `${(Math.floor(Math.random() * 1000) * (index ? 1 : -1)) / 10}`.replace(/-/, "_"),
		hint1: "Use operators: . +",
		hint2: "convert to number, increment, convert to string",
		tests: [
			{description: testValue => <span><b>increment</b>{`"${testValue}" equals "${(+testValue.replace(/_/, "-") + 1).toFixed(1).replace(/-/, "_")}"`}</span>, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue).replace(/_/, "-") - testValue.replace(/_/, "-") - 1) < 1E-10;
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