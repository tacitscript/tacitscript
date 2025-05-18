import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";
import integerBetween from "../logic/integer-between.js";

const totalCharacters = strings => strings.reduce((acc, string) => acc + string.length, 0);

export default {
	id: "vector-length",
	name: "Vector Length",
	operations: <React.Fragment><a href="#length"># (length)</a></React.Fragment>,
	description: <div>
		<p><a href="#length"># (length)</a> takes a string or an array, and returns the length.</p>
		<div className="code-block">{getOperationExamples([
			[`#"hello"=5`],
			["#(7 8 9)=3"],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>totalCharactersAN</b> that takes an array of strings and returns the total number of characters:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">totalCharactersAN</div>
			<TextEdit {...{...details, multiline: false, solution: '(+ "")$.#'}}/>
		</div>,
		getTestValues: () => [[], R.times(() => R.pipe(
            R.times(() => "abcdefghijklmnopqrstuvwxyz"[integerBetween(0, 25)]),
            R.join(""),
        )(integerBetween(4, 10)), integerBetween(2, 4))],
		hint1: "Use operators: + . $ #",
		hint2: "concat-reduce then length (use reduce with a starting value)",
		tests: [
			...R.times(() => ({
				description: testData => <span><b>totalCharactersAN</b>{`${ts.toString(testData)} equals ${totalCharacters(testData)}`}</span>,
				condition: ({solution, testValue}) => totalCharacters(testValue) === solution(testValue),
			}), 2),
			{description: () => <span><b>totalCharactersAN</b> uses the <a href="#hash">#</a> operator</span>, condition: ({es6}) => es6.includes("ts.hash")},
		],
	},
};