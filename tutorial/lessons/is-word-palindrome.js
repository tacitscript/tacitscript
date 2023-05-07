import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";

const palindromes = ["deified", "rotator", "reviver", "racecar", "refer"];
const nonPalindromes = ["hello", "goodbye", "tacitscript", "banana", "adage"];

export default {
	id: "word-palindrome",
	name: "Word Palindrome",
	operations: <React.Fragment><a href="#identity">(;) identity</a></React.Fragment>,
	description: <div>
		<p>The <a href="#identity">(;) identity</a> operation takes any value and returns the same value.</p>
		<div className="code-block">;6=6</div>
		<p>Although the utility of such an operation may seem obscure at first, it can prove to be powerful when used in conjuction with other operations.</p>
		<p>Used in conjuction with <a href="#applyToArray">(.) applyToArray</a>, we can turn a value into a single element array:</p>
		<div className="code-block">{getOperationExamples([
			["encapsulate", `.(; )`, "encapsulate5=(5 )"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the operator <b>isWordPalindromeST</b> that takes a lowercase word and determines whether that word is the same when reversed:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">isWordPalindromeST</div>
			<TextEdit {...{...details, multiline: true, solution: `.(; _).=$`}}/>
		</div>,
		getTestValues: () => [
			palindromes[Math.floor(Math.random() * palindromes.length)],
			nonPalindromes[Math.floor(Math.random() * nonPalindromes.length)],
		],
		hint1: "Use operators: _ = . $ ;",
		hint2: "Fork to create the string and its reverse, then equality-reduce",
		tests: [
			{description: testValue => <span><b>isWordPalindromeST</b>{`"${testValue}"`} equals !()</span>, condition: ({solution, testValue}) => solution(testValue) === true},
			{description: testValue => <span><b>isWordPalindromeST</b>{`"${testValue}"`} equals ()</span>, condition: ({solution, testValue}) => solution(testValue) === false},
		],
	},
};