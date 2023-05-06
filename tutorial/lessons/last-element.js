import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import Table from "../components/table.js";
import encode from "../utilities/encode.js";
import getEncodingExample from "../utilities/get-encoding-example.js";

const optEncode = R.pipe(
	encode,
	R.map(([no, char]) => (no === 1) ? char : [no, char]),
);

export default {
	id: "last-element",
	name: "Last Element",
	operations: <React.Fragment><a href="#last">(]) last</a></React.Fragment>,
	description: <div>
		<p>The <a href="#last">(]) last</a> operation takes an array, and returns the last element (or <i>undefined</i> if the array is empty).</p>
		<div className="code-block">](7 8 9)=9</div>
	</div>,
	exercise: {
		question: <div>
			<div>Building on <a href="#first-element">encode</a> developed in the previous lesson, we will optimise the encoding.</div>
			<p>Wherever we see a block of one character, we will just output the character itself, rather than the array.</p>
			<p>Define <b>optEncodeSA</b> such that:</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		packSA ${solutions["pack"].def}
		encodeSA packSA.${solutions["first-element"].def}
		solution encodeSA.${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">packSA</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#pack">Please solve this first</a>)(details.solutions["pack"])],
			[<div className="name">encodeSA</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">packSA.{def}</div> : <a href="#first-element">Please solve this first</a>)(details.solutions["first-element"])],
			[<div className="name">optEncodeSA</div>, <div className="combined">encodeSA.<TextEdit {...{...details, solution: '(([.=1 ]) ;)?@', disabled: (({def, pass}) => !def || !pass)(details.solutions["first-element"] || {})}}/></div>],
		]}</Table></React.Fragment>,
		getTestValues: () => [getEncodingExample()],
		hint1: "Use operators: = . ; ? @ [ ]",
		hint2: "if number of characters is 1, output the character, otherwise, leave as is",
		tests: [
			{description: testValue => <span><b>optEncodeSA</b>{`"${testValue}" equals ${ts.toString(optEncode(testValue))}`}</span>, condition: ({def, es6, solution, testValue}) => JSON.stringify(optEncode(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>optEncodeSA</b> uses <a href="#last">(]) last</a></span>, condition: ({es6}) => es6.includes("ts.bracketright")},
		],
	},
};