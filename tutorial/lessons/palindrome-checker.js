import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import Table from "../components/table.js";

const palindromes = ["Mr. Owl ate my metal worm", "Do geese see God?", "Sir, I demand, I am a maid named Iris", "Cigar? Toss it in a can. It is so tragic.", "A man, a plan, a canal -- Panama!", "Evil snack cans live?"];
const nonPalindromes = ["Dodder chicken, a silent ten; nettles, a kicka re: Rod", "Evil elves love living in Elvis' Levis", "Ma, I'm all llama, I am", "Never ever, Eve, even?", "Enda; at last, a 'good' Edna"];

export default {
	id: "palindrome-checker",
	name: "Palindrome Checker",
	operations: <React.Fragment><a href="#indicesOf">(@) indicesOf</a>, <a href="#filter">(?) filter</a>, <a href="#join">($) join</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>filterPunctuationSS</b> that removes all except lower-case alphabetic characters from a string. You may use the string <b>alphabeticS</b> in this task.</div>
			<p>Using the results from <a href="#word-palindrome">here</a> and <a href="#host-language-interface2">here</a>, we can now construct the full palindrome checker, <b>isPalindromeST</b>.</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		toLowerCaseSS ${solutions["host-language-interface2"].def}
		isWordPalindromeST ${solutions["word-palindrome"].def}
		alphabeticS "abcdefghijklmnopqrstuvwxyz"
		filterPunctuationSS ${def}
		solution toLowerCaseSS.filterPunctuationSS.isWordPalindromeST
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">toLowerCaseSS</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#host-language-interface2">Please solve this first</a>)(details.solutions["host-language-interface2"])],
			[<div className="name">isWordPalindromeST</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#word-palindrome">Please solve this first</a>)(details.solutions["word-palindrome"])],
			[<div className="name">alphabeticS</div>, <div className="expression">"abcdefghijklmnopqrstuvwxyz"</div>],
			[<div className="name">filterPunctuationSS</div>, <TextEdit {...{...details, solution: '""%.@alphabetic?.""$', disabled: R.pipe(
				R.pick(["host-language-interface2", "word-palindrome"]),
				R.toPairs,
				results => (results.length < 2) || R.any(([, {def, pass}]) => !def || !pass, results),
			)(details.solutions)}}/>],
			[<div className="name">isPalindromeST</div>, <div className="expression">toLowerCaseSS.filterPunctuationSS.isWordPalindromeST</div>],
		]}</Table></React.Fragment>,
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