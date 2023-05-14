import TextEdit from "../components/text-edit.js";
import Table from "../components/table.js";
import parser from "common/src/parser.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval
const solution = '.((""+.!isWordPalindromeST)^(+1) ;).-$';

const es6 = ts2es6(`/*ts
	isWordPalindromeST			.(; _).=$
	nextPalindromeNN			${solution}
*/`);
eval(es6.replace(/const /g, "var "));

export default {
	id: "iterating-a-result",
	name: "Iterating a Result",
	operations: <React.Fragment><a href="#while">(^) while</a>, <a href="#notCondition">(!) notCondition</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define <b>nextPalindromeNN</b> that takes an integer and returns the number of integers between this and the next integer that is a palidrome.</div>
			<p>For instance, <b>nextPalindromeNN</b>15=7, as <b>15+7=22</b>, which is a palindrome.</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		isWordPalindromeST	${solutions["word-palindrome"].def}
		solution      		${def}
*/
`,
		getHtml: details => <React.Fragment><br/><Table>{[
			[<div className="name">isWordPalindromeST</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#word-palindrome">Please solve this first</a>)(details.solutions["word-palindrome"])],
			[<div className="name">nextPalindromeNN</div>, <TextEdit {...{...details, solution, disabled: (({def, pass}) => !def || !pass)(details.solutions["word-palindrome"] || {})}}/>],
		]}</Table></React.Fragment>,
		getTestValues: () => [Math.floor(Math.random() * 1000000000)],
		hint1: "Use operators: + - . $ ; ^ ! isWordPalindromeST",
		hint2: "Iterate, checking if it the number is a palindrome, incrementing each time, then find difference with original",
		tests: [
			({description: testValue => <span><b>nextPalindromeNN</b>{`${testValue} equals ${nextPalindromeNN(testValue)}`}</span>, condition: ({solution, testValue}) => nextPalindromeNN(testValue) === solution(testValue)}),
			{description: () => <span><b>nextPalindromeNN</b> uses <b>isWordPalindromeST</b></span>, condition: ({def}) => def.includes("isWordPalindromeST")},
		],
	},
};