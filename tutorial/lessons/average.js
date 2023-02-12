import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const average = array => R.reduce(R.add, 0, array) / array.length;

export default {
	id: "average",
	name: "Average",
	operations: <React.Fragment><a href="#applyToArray">(.) applyToArray</a>, <a href="#length">(#) length</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>averageAN</b> that takes an array of numbers and returns the <a target="_blank" href="https://en.wikipedia.org/wiki/Arithmetic_mean">arithmetic mean</a>:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">averageAN</div>
			<TextEdit {...{...details, multiline: true, solution: `.(+$ #)./$`}}/>
		</div>,
		getTestValue: index => {
			if (!index) return R.times(() => Math.floor(Math.random() * 10), 5);

			return [Math.floor(Math.random() * 10)];
		},
		hint1: "Use operators: + / . $ #",
		hint2: "calculate the sum and length of the array, then divide-reduce",
		tests: [
			{description: testValue => <span><b>averageAN</b>{`${ts.toString(testValue)} equals ${average(testValue)}`}</span>, condition: ({solution, testValue}) => {
				try {
					return solution(testValue) === average(testValue);
				} catch (e) {
					return false;
				}
			}},
			{description: testValue => <span><b>averageAN</b>{`${ts.toString(testValue)} equals ${testValue[0]}`}</span>, condition: ({solution, testValue}) => {
				try {
					return solution(testValue) === testValue[0];
				} catch (e) {
					return false;
				}
			}},
		],
	},
};