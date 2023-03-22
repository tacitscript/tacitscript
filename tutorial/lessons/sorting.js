import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const sentences = [
	"The greatest glory in living lies not in never falling but in rising every time we fall",
	"Whoever is happy will make others happy too",
	"I alone cannot change the world but I can cast a stone across the water to create many ripples",
];
const longestWord = R.pipe(
	R.split(" "),
	R.sortBy(R.length),
	R.last,
);

export default {
	id: "sorting",
	name: "Sorting",
	operations: <React.Fragment><a href="#lessThan">(&lt;) lessThan</a>, <a href="#sort">(&lt;) sort</a></React.Fragment>,
	description: <div>
		<p>The <a href="#sort">(&lt;) sort</a> operation takes a unary operator <b>u</b> to the left, and array to the right.</p>
		<p>The array is sorted in ascending order according to the values return by applying <b>u</b> to each element.</p>
		<p><b>u</b> should return a number or string; types that are sortable through the <a href="#lessThan">(&lt;) lessThan</a> operator.</p>
		<div className="code-block">{getOperationExamples([
			["registerA", `;<("Bob" "Eve" "Alice")`, `equals ("Alice" "Bob" "Eve")`]
		])}</div>
	</div>,
	exercise: {
		question: <div>Define the operator <b>longestWordSS</b> that takes a simple sentence (no punctuation) and returns longest word (if there are multiple longest words, return any of them):</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">longestWordSS</div>
			<TextEdit {...{...details, multiline: true, solution: '" "%.#<.]'}}/>
		</div>,
		hint1: "Use operators: . # ] % <",
		hint2: "Split into words, sort by length, take the last",
		getTestValues: () => [sentences[Math.floor(Math.random() * sentences.length)]],
		tests: [
			{description: testValue => <span><b>longestWordSS</b>{`"${testValue}"`} equals {longestWord(testValue)}</span>, condition: ({solution, testValue}) => longestWord(testValue) === solution(testValue)},
			{description: testValue => <span><b>longestWordSS</b> uses <a href="#less">less (&lt;)</a></span>, condition: ({es6}) => es6.includes("ts.less")},
		],
	},
};