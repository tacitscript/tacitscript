import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

export default {
	id: "word-palindrome",
	name: "Word Palindrome",
	operations: <React.Fragment><a href="#identity">(;) identity</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>isWordPalindromeST</b> that takes a lowercase word and returns whether that word is the same when reversed:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">isWordPalindromeST</div>
			<TextEdit {...{...details, multiline: true, solution: `.(; _).=$`}}/>
		</div>,
		getTestValues: () => [],
		hint1: "Use operators: + / . $ #",
		hint2: "Calculate the sum and length of the array, then divide-reduce",
		tests: [
			{description: testValue => <span><b>averageAN</b>{`${ts.toString(testValue)} equals ${average(testValue)}`}</span>, condition: ({solution, testValue}) => solution(testValue) === average(testValue)},
			{description: testValue => <span><b>averageAN</b>{`${ts.toString(testValue)} equals ${testValue[0]}`}</span>, condition: ({solution, testValue}) => solution(testValue) === testValue[0]},
		],
	},
};