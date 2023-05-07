import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const indexedSort = R.pipe(R.addIndex(R.map)((x, index) => [x, index + 1]), R.sortBy(R.head), R.map(R.last));

export default {
	id: "indexed-sort",
	name: "Indexed Sort",
	exercise: {
		question: <div>
			<div>Define the operator <b>indexedSortAA</b> that takes an array of numbers, sorts them in ascending order, and returns the array of positions that each element had in the original array.</div>
			<p>For example, given <span className="code">(8 5 6 3)</span>, return <span className="code">(4 2 3 1)</span>:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">indexedSortAA</div>
			<TextEdit {...{...details, multiline: true, solution: `.(; #.+1^).*$.[<.]@`}}/>
		</div>,
		getTestValues: () => [R.sortBy(Math.random, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])],
		hint1: "Use operators: + * . $ # @ ; ^ [ ] <",
		hint2: "Zip the array with 1-based indices, sort by first, map by last",
		tests: [
			{description: testValue => <span><b>indexedSortAA</b>{`${ts.toString(testValue)} equals ${ts.toString(indexedSort(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(indexedSort(testValue)) === JSON.stringify(solution(testValue))},
		],
	},
};