import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const string = "abcdefghij";
const rotateArray = index => [...array.slice(index), ...array.slice(0, index)];
const reverseRotateString = index => [string.slice(-index), string.slice(0, -index)].join("");

export default {
	id: "split",
	name: "Splitting Vectors",
	operations: <React.Fragment><a href="#split">(%) split</a></React.Fragment>,
	description: <div>
		<p>In contast to <a href="#dollar">dollar ($)</a> operations, that represent <i>joining</i> operations, <a href="percent">percent (%)</a> operations involve breaking things apart.</p>
		<p>The <a href="#split">(%) split</a> operation takes an integer to the left, and array or string to the right.</p>
		<p>The vector is divided in two, just before the index specified. (Note that negative indices are also supported.)</p>
		<div className="code-block">{getOperationExamples([
			["_2%(1 2 3 4 5)=((1 2 3) (4 5))"],
			['2%"abcde"=("ab" "cde")'],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>The <b>rotateNCA</b> operator takes an integer to the left, and vector to the right.</div>
			<p>The vector is split at the given index, the pieces swapped in order, and re-joined.</p>
			<p>Define the operator <b>rotateNCA</b> such that:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">rotateNCA</div>
			<TextEdit {...{...details, multiline: true, solution: "%._.+$"}}/>
		</div>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 9) + 1, 2),
		hint1: "Use operators: + _ . $ %",
		hint2: "split, reverse, concat",
		tests: [
			{description: testValue => <span>{testValue}<b>rotateNCA</b>{`${ts.toString(array)} equals ${ts.toString(rotateArray(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(rotateArray(testValue)) === JSON.stringify(solution(testValue, array))},
			{description: testValue => <span>{`_${testValue}`}<b>rotateNCA</b>{`"${string}" equals "${reverseRotateString(testValue)}"`}</span>, condition: ({solution, testValue}) => reverseRotateString(testValue) === solution(-testValue, string)},
			{description: () => <span><b>rotateNCA</b> uses <a href="#percent">percent (%)</a></span>, condition: ({es6}) => es6.includes("ts.percent")},
		],
	},
};