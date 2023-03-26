import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const inputs = [
	["[", x => x[0], ["Alice", "Bob", "Eve", "Amy", "Egle"]],
	[";", R.identity, [4, 2, 1, 4, 6, 3, 2]],
	["(%2.=0)", x => (x % 2) === 0, [4, 2, 1, 4, 6, 3, 2]],
	["#", x => x.length, ["Alice", "Bob", "Eve", "Amy", "Egle"]],
	["<0", x => x < 0, [2, -3, 0, -1, 4, 2]],
];

export default {
	id: "grouping",
	name: "Grouping",
	operations: <React.Fragment><a href="#lessThan">(&lt;) lessThan</a>, <a href="#remainder">(%) remainder</a>, <a href="#groupBy">(/) groupBy</a></React.Fragment>,
	description: <div>
		<p>We use the <a href="#groupBy">(/) groupBy</a> operation to group elements of an array that are equal according to some condition.</p>
		<p><a href="#groupBy">(/) groupBy</a> takes an operation to the left to be evaluated against each element in the array to the right, and returns a dictionary of grouped elements.</p>
		<div className="code-block">{getOperationExamples([
			["wordLengthsA", `#/("This" "is" "not" "long")`, `equals \\(("2" ("is" )) ("3" ("not" )) ("4" ("This" "long")))`],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the binary operator <b>countByUAD</b> that groups elements of an array according to a given condition, and returns the number of matches for each result:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">countByUAD</div>
			<TextEdit {...{...details, multiline: true, solution: '/.#@'}}/>
		</div>,
		getTestValues: () => [inputs[Math.floor(Math.random() * inputs.length)]],
		hint1: "Use operators: / . # @",
		hint2: "groupBy then length-map",
		tests: [
			{description: ([def, fn, testData]) => <span>{def}<b>countByUAD</b>{`${ts.toString(testData)} equals ${ts.toString(R.countBy(R.pipe(fn, ts.toString), testData))}`}</span>, condition: ({solution, testValue: [def, fn, testData]}) => JSON.stringify(R.countBy(R.pipe(fn, ts.toString), testData)) === JSON.stringify(solution(fn, testData))},
			{description: () => <span><b>countByUAD</b> uses the <a href="#slash">slash (/)</a> operator</span>, condition: ({es6}) => es6.includes("ts.slash")},
		],
	},
};