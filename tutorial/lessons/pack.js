import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import pack from "../utilities/pack.js";
import getEncodingExample from "../utilities/get-encoding-example.js";

export default {
	id: "pack",
	name: "Pack",
	operations: <React.Fragment><a href="#notBinary">(!) notComparator</a>, <a href="#chunkWithComparator">(%) chunkWithComparator</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>In this and the following two sections, we'll develop a compression encoding algorithm for strings that contain many sequences of repeated characters.</div>
			<p>Define the operator <b>packSA</b> that splits a string into blocks of repeated characters, such that:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">packSA</div>
			<TextEdit {...{...details, multiline: true, solution: `!=%`}}/>
		</div>,
		getTestValues: () => [getEncodingExample()],
		hint1: "Use operators: = ! %",
		hint2: "Split string whenever there is a change in character",
		tests: [{
			description: testValue => <span><b>packSA</b>{`"${testValue}" equals ${ts.toString(pack(testValue))}`}</span>,
			condition: ({solution, testValue}) => JSON.stringify(solution(testValue)) === JSON.stringify(pack(testValue)),
		}],
	},
};