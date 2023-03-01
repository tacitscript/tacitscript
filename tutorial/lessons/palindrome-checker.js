import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const isWordPalindrome = word => word === word.split("").reverse().join("");
const palindromes = ["deified", "rotator", "reviver", "racecar", "refer"];
const nonPalindromes = ["hello", "goodbye", "tacitscript", "banana", "adage"];

export default {
	id: "palindrome-checker",
	name: "Palindrome Checker",
	operations: <React.Fragment><a href="#identity">(;) identity</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>filterPunctuationSS</b> that removes all except lower-case alphabetic characters from a string. You may use the string <b>alphabeticS</b> in this task.</div>
			<p>Using the results from <a href="#word-palindrome">Section 10</a> and <a href="#host-language-interface2">Section 11</a>, we can now construct a full palindrome checker.</p>
			<p>Another line of text</p>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="multiple-line"><div className="name-expression">
		<div className="name">filterPunctuationSS</div>
			<TextEdit {...{...details, solution: '""%.@alphabetic?.""$'}}/>
		</div><div className="name-expression">
			<div className="name">isPalindromeST</div>
			<div className="expression">toLowerCaseSS.filterPunctuationSS.isWordPalindromeST</div>
		</div></div>,
		getTestValues: () => [
			palindromes[Math.floor(Math.random() * palindromes.length)],
			nonPalindromes[Math.floor(Math.random() * nonPalindromes.length)],
		],
		hint1: "Use operators: _ = . $ ;",
		hint2: "Fork to create the string and its reverse, then equality-reduce",
		tests: [
			{description: testValue => <span>{`${testValue},`}<b>isWordPalindromeST</b> equals !()</span>, condition: ({solution, testValue}) => solution(testValue) === true},
			{description: testValue => <span>{`${testValue},`}<b>isWordPalindromeST</b> equals ()</span>, condition: ({solution, testValue}) => solution(testValue) === false},
		],
	},
};