import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import Table from "../components/table.js";

const palindromes = ["Mr. Owl ate my metal worm", "Do geese see God?", "Sir, I demand, I am a maid named Iris", "Cigar? Toss it in a can. It is so tragic.", "A man, a plan, a canal -- Panama!", "Evil snack cans live?"];
const nonPalindromes = ["Dodder chicken, a silent ten; nettles, a kicka re: Rod", "Evil elves love living in Elvis' Levis", "Ma, I'm all llama, I am", "Never ever, Eve, even?", "Enda; at last, a 'good' Edna"];

export default {
	id: "palindrome-checker",
	name: "Palindrome Checker",
	operations: <React.Fragment><a href="#identity">(;) identity</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>filterPunctuationSS</b> that removes all except lower-case alphabetic characters from a string. You may use the string <b>alphabeticS</b> in this task.</div>
			<p>Using the results from <a href="#word-palindrome">here</a> and <a href="#host-language-interface2">here</a>, we can now construct the full palindrome checker, <b>isPalindromeST</b>.</p>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <p><br/><Table>{[
			[<div className="name">isWordPalindromeST</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#word-palindrome">Please solve this first</a>)(details.solutions["word-palindrome"])],
			[<div className="name">alphabeticS</div>, <div className="expression">"abcdefghijklmnopqrstuvwxyz"</div>],
			[<div className="name">filterPunctuationSS</div>, <TextEdit {...{...details, solution: '""%.@alphabetic?.""$'}}/>],
			[<div className="name">isPalindromeST</div>, <div className="expression">toLowerCaseSS.filterPunctuationSS.isWordPalindromeST</div>],
		]}</Table></p>,
		getTestValues: () => [
			palindromes[Math.floor(Math.random() * palindromes.length)],
			nonPalindromes[Math.floor(Math.random() * nonPalindromes.length)],
		],
		hint1: "Use operators: $ @ % ? .",
		hint2: "Split into characters, filter by alphabetic, rejoin into string",
		tests: [
			{description: testValue => <span><b>isPalindromeST</b>{`"${testValue}"`} equals !()</span>, condition: ({solution, testValue}) => solution(testValue) === true},
			{description: testValue => <span><b>isPalindromeST</b>{`"${testValue}"`} equals ()</span>, condition: ({solution, testValue}) => solution(testValue) === false},
		],
	},
};