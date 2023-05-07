import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const testValues = [
	["(%2.=0)", x => (x % 2) === 0, [8, -4, 2, 0], [6, -2, 2, 3]],
	[">0", x => x > 0, [6, 1, 4, 9], [4, 6, 2, 0]],
	[";", ts.isTruthy, [0, "hello", [1], {"a": 1}], [undefined, "hello", [1], {"a": 1}]],
];

export default {
	id: "every",
	name: "Generic Binary Operators",
	operations: <React.Fragment><a href="#pair">(:) pair</a>, <a href="#pipeBinaryToArray">(.) pipeBinaryToArray</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the binary operator <b>everyUAT</b> that takes a condition on the left to be checked against every element in the array on the right:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">everyUAT</div>
			<TextEdit {...{...details, multiline: true, solution: `:.(?$ ]).#@.=$`}}/>
		</div>,
		getTestValues: () => R.pipe(R.sortBy(Math.random), R.slice(0, 2), R.map(([def, fn, ...options]) => ({def, fn, testValue: options[Math.floor(Math.random() * 2)]})))(testValues),
		hint1: "Use operators: = . # $ @ ] ? :",
		hint2: "compare number of results when filtered against total number",
		tests: R.times(() => ({
			description: ({def, fn, testValue}) => <span>{def}<b>everyUAT</b>{ts.toString(testValue)} equals {ts.toString(R.all(fn, testValue))}</span>,
			condition: ({solution, testValue: {fn, testValue: test}}) => R.all(fn, test) === solution(fn, test),
		}), 2),
	},
};