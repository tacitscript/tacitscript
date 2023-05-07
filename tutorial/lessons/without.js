import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const testValues = [
	[[0, 1], [1, 2, 1, 0, 3, 1, 4]],
	[[2, 1, -1], [-1, 4, 3, 2, 6, 8]],
	[[3, 1], [4, 1, 2, 0, 3, 7]],
];

export default {
	id: "without",
	name: "ANDing conditions",
	operations: <React.Fragment><a href="#andCondition">(&) andCondition</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the binary operator <b>withoutAAA</b> that removes the elements in the array on the right that are contained in the (non-empty) array on the left:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">withoutAAA</div>
			<TextEdit {...{...details, multiline: true, solution: `:,(!=@.&$ ;).?$`}}/>
		</div>,
		getTestValues: () => R.pipe(R.sortBy(Math.random), R.slice(0, 2))(testValues),
		hint1: "Use operators: , = . $ ; @ ? ! : &",
		hint2: "pair, negate equality to all exclusions and AND them, filter-reduce",
		tests: [
			...R.times(() => ({
				description: ([left, right]) => <span>{ts.toString(left)}<b>withoutAAA</b>{ts.toString(right)} equals {ts.toString(R.without(left, right))}</span>,
				condition: ({solution, testValue: [left, right]}) => JSON.stringify(R.without(left, right)) === JSON.stringify(solution(left, right)),
			}), 2),
			{description: () => <span><b>withoutAAA</b> uses <a href="#ampersand">ampersand (&)</a></span>, condition: ({es6}) => es6.includes("ts.ampersand")},
		],
	},
};