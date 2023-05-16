import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const es6 = ts2es6(`/*ts
	frequencies			.(#.~/.2' ""%.;/.#@).@$
*/`);
eval(es6.replace(/const /g, "var "));

const phrases = ["Good food", "Happy puppy", "Hot coffee", "Black cat", "Tall tree", "Red dress"];

export default {
	id: "binary-operator-flipping",
	name: "Binary Operator Flipping",
	operations: <React.Fragment><a href="#flip">(~) flip</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>frequenciesSD</b> that takes a string of text and returns a dictionary whose keys are the characters, and values are the probabilities at which those characters occur in the sample.</div>
			<p>The sequence of keys (including space) should reflect the order that each character first appears in the sample. Give probabilities to 2 decimal places. (We would expect the sum of probabilities to equal 1.)</p>
			<p>For example, given <span className="code">"Hello Lee!"</span>, return <span className="code">\(("H" 0.11) ("e" 0.33) ("l" 0.22) ("o" 0.11) (" " 0.11) ("L" 0.11))</span>:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">frequenciesSD</div>
			<TextEdit {...{...details, multiline: true, solution: `.(#.~/.2' ""%.;/.#@).@$`}}/>
		</div>,
		getTestValues: () => [phrases[Math.floor(Math.random() * phrases.length)]],
		hint1: "Use operators: / . $ @ # ; % ' ~",
		hint2: "(Division by string length, then take to 2dp) should be mapped over the dictionary constructed by grouping characters in the string",
		tests: [
			{description: testValue => <span><b>frequenciesSD</b>{`"${testValue}" equals ${ts.toString(frequencies(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(frequencies(testValue)) === JSON.stringify(solution(testValue))},
		],
	},
};