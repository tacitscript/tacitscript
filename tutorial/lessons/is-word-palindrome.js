import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const isWordPalindrome = word => word === word.split("").reverse().join("");
const palindromes = ["deified", "rotator", "reviver", "racecar", "refer"];
const nonPalindromes = ["hello", "goodbye", "tacitscript", "banana", "adage"];

export default {
	id: "word-palindrome",
	name: "Word Palindrome",
	operations: <React.Fragment><a href="#identity">(;) identity</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>isWordPalindromeST</b> that takes a lowercase word and determines whether that word is the same when reversed:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
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