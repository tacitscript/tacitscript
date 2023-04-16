import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const checksum = R.reduce((acc, value) => ((acc + value) * 113) % 10000007, 0);

export default {
	id: "checksum",
	name: "Checksum",
	exercise: {
		question: <div>
			<div>Checksums are values used to check data integrity, such as checking a message has been transported without error.</div>
			<p>Define the operator <b>checksumAN</b> that receives an array of data and calculates a checksum for it by iterating through each element and applying the following algorithm:</p>
			<ol>
				<li>Add the element to the current result (starts at <b>0</b>)</li>
				<li>multiply by <b>113</b></li>
				<li>calculate the remainder after dividing by <b>10000007</b></li>
				<li>loop result to the next element</li>
			</ol>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">checksumAN</div>
			<TextEdit {...{...details, multiline: true, solution: '(+.*113.%10000007 0)$'}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) + 1)],
		hint1: "Use operators: + * . $",
		hint2: "Reduce by adding to accumulator, multiplying and finding the remainder",
		tests: [
			{description: testValue => <span><b>checksumAN</b>{`${ts.toString(testValue)} equals ${checksum(testValue)}`}</span>, condition: ({solution, testValue}) => checksum(testValue) === solution(testValue)},
		],
	},
};