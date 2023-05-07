import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import Table from "../components/table.js";
import encode from "../utilities/encode.js";
import getEncodingExample from "../utilities/get-encoding-example.js";

export default {
	id: "first-element",
	name: "First Element",
	operations: <React.Fragment><a href="#first">([) first</a></React.Fragment>,
	description: <div>
		<p>The <a href="#first">([) first</a> operation takes an array, and returns the first element (or <i>undefined</i> if the array is empty).</p>
		<div className="code-block">[(7 8 9)=7</div>
	</div>,
	exercise: {
		question: <div>
			<div>Building on <a href="#pack">pack</a> developed in the previous lesson, we will encode each string chunk as an array containing two elements: the number of repeats, and the character to be repeated.</div>
			<p>Define <b>encodeSA</b> such that:</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		packSA ${solutions["pack"].def}
		solution packSA.${def}
*/
`,
		getHtml: details => <React.Fragment><br/><Table>{[
			[<div className="name">packSA</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#pack">Please solve this first</a>)(details.solutions["pack"])],
			[<div className="name">encodeSA</div>, <div className="combined">packSA.<TextEdit {...{...details, solution: '(.(# [))@', disabled: (({def, pass}) => !def || !pass)(details.solutions["pack"] || {})}}/></div>],
		]}</Table></React.Fragment>,
		getTestValues: () => [getEncodingExample()],
		hint1: "Use operators: . # @ [",
		hint2: "fork each element to give the size and first element",
		tests: [
			{description: testValue => <span><b>encodeSA</b>{`"${testValue}" equals ${ts.toString(encode(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(encode(testValue)) === JSON.stringify(solution(testValue))},
			{description: () => <span><b>encodeSA</b> uses <a href="#first">([) first</a></span>, condition: ({es6}) => es6.includes("ts.bracketleft")},
		],
	},
};