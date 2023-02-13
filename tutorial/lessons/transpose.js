import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));
const randomToN = n => Math.floor(Math.random() * n);

export default {
	id: "transpose",
	name: "Transpose",
	operations: <React.Fragment><a href="#zip">(*) zip</a>, <a href="#binaryUnaryPipe">(.) binaryUnaryPipe</a>, <a href="#unnest">(&#x7b;) unnest</a>, <a href="#map">(@) map</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>transposeAA</b> that takes an array of <b>M</b> arrays, each of <b>N</b> values, and returns the array of <b>N</b> arrays each of <b>M</b> values, that constitues its <a target="_blank" href="https://en.wikipedia.org/wiki/Transpose">transpose</a> (assume <b>M</b> and <b>N</b> &gt; 1):</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">transposeAA</div>
			<TextEdit {...{...details, multiline: true, solution: `(*.{@)$`}}/>
		</div>,
		getTestValue: () => {
			const rows = randomToN(2) + 2;
			const columns = randomToN(3) + 2;

			return R.times(() => R.times(() => randomToN(10), columns), rows);
		},
		hint1: "Use operators: * . $ @ {",
		hint2: "For each row, zip with accumulator and unnest the column",
		tests: [{
			description: testValue => <span><b>transposeAA</b>{`${ts.toString(testValue)} equals ${ts.toString(transpose(testValue))}`}</span>,
			condition: ({solution, testValue}) => JSON.stringify(solution(testValue)) === JSON.stringify(transpose(testValue)),
		}],
	},
};