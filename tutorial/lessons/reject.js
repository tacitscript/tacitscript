import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const testValues = [
	["(%2.=0)", x => (x % 2) === 0, [4, 3, 0, -2, 1, 6]],
	[">0", x => x > 0, [4, 3, 0, -2, 1, 6]],
	[";", ts.isTruthy, [0, "", true, {"a": 1}, undefined, [], false, 1, {}, "hello", [1]]],
];

export default {
	id: "reject",
	name: "Generic Binary Operators 2",
	operations: <React.Fragment><a href="#binaryZipApplyTo">(,) binaryZipApplyTo</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the binary operator <b>rejectUAA</b> that takes a condition on the left, and removes each element in the array on the right that passes the condition:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">rejectUAA</div>
			<TextEdit {...{...details, multiline: true, solution: `:,(! ;).?$`}}/>
		</div>,
		getTestValues: () => R.pipe(R.sortBy(Math.random), R.slice(0, 2))(testValues),
		hint1: "Use operators: , . $ ; ? ! :",
		hint2: "pair, negate condition, filter-reduce",
		tests: [
			...R.times(() => ({
				description: ([def, fn, testValue]) => <span>{def}<b>rejectUAA</b>{ts.toString(testValue)} equals {ts.toString(R.reject(fn, testValue))}</span>,
				condition: ({solution, testValue: [, fn, test]}) => JSON.stringify(R.reject(fn, test)) === JSON.stringify(solution(fn, test)),
			}), 2),
			{description: () => <span><b>rejectUAA</b> uses <a href="#comma">comma (,)</a></span>, condition: ({es6}) => es6.includes("ts.comma")},
		],
	},
};