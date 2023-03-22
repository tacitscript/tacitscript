import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const dictionaries = [
	{first: "gold", second: "silver", third: "bronze"},
	{first: 1, second: 2, third: 3},
	{gold: 1, silver: 2, bronze: 3},
];
const invert = R.pipe(R.toPairs, R.map(R.reverse), R.fromPairs);

export default {
	id: "dictionaries",
	name: "Dictionaries",
	operations: <React.Fragment><a href="#fromPairs">(\) fromPairs</a>, <a href="#toPairs">(\) toPairs</a></React.Fragment>,
	description: <div>
		<p>Sometimes it is useful to have a data container indexed by labels rather than integers (as in an array.)</p>
		<p>For this purpose, tacitscript supports the <b>dictionary</b>, which is an <a href="https://en.wikipedia.org/wiki/Associative_array" target="_blank">associative array</a>, with string keys.</p>
		<p>We can create a dictionary by passing an array to the <a href="#fromPairs">(\) fromPairs</a> operation.</p>
		<div className="code-block">{getOperationExamples([
			["ages", `\\(("Alice" 20) ("Bob" 24))`],
		])}</div>
		<p>Note that keys in a dictionary are unique, and strings (non-string keys will be converted to strings via a <span className="code">""+</span> operation.)</p>
		<p>When converting from pairs, duplicate keys will overwrite data previously specified.</p>
		<div className="code-block">{getOperationExamples([
			["dictD", "\\((1 1) (2 2) (1 3))", `equals \\(("1" 3) ("2" 2))`]
		])}</div>
		<p>The <a href="#toPairs">(\) toPairs</a> operation will transform a dictionary to an array of pairs.</p>
		<div className="code-block">\dictD=(("1" 3) ("2" 2))</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>invertDD</b> that takes a dictionary and returns the dictionary with keys and values exchanged:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">invertDD</div>
			<TextEdit {...{...details, multiline: true, solution: '\\._@.\\'}}/>
		</div>,
		getTestValues: () => [dictionaries[Math.floor(Math.random() * dictionaries.length)]],
		hint1: "Use operators: _ @ \\",
		hint2: "Convert to array, reverse-map, and convert back to dictionary",
		tests: [
			{description: testValue => <span><b>invertDD</b>{`(${ts.toString(testValue)}) equals ${ts.toString(invert(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(invert(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>invertDD</b> uses the <a href="#backslash">backslash (\)</a> operator</span>, condition: ({es6}) => es6.includes("ts.backslash")},
		],
	},
};