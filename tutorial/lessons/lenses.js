import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const keySuffix = `:,(.((0 )\` ~+).> \\).@$.\\`;
const es6 = ts2es6(`/*ts
	keySuffixSDD		${keySuffix}
*/`);
eval(es6.replace(/const /g, "var "))

const suffixes = ["'", "-copy", "2"];

export default {
	id: "lenses",
	name: "Lenses",
	operations: <React.Fragment><a href="#over">(&gt;) over</a></React.Fragment>,
	description: <div>
		<p>tacitscript operations do not mutate. When we want to modify data, we take a copy.</p>
		<p>Arrays and dictionaries can have complicated hierarchies; <a href="#over">(&gt;) over</a> makes it easier to return a copy of such a data structure, changed somewhere it its hierarchy.</p>
		<p><a href="#over">(&gt;) over</a> takes an array <b>a</b> to the left, and the data container (array or dictionary) to the right. <a>a</a> contains two components:</p>
		<ol>
			<li>an array detailing the path to the point in the data structure to be changed, and</li>
			<li>a unary operator to be applied to that node in the data structure</li>
		</ol>
		<div className="code-block">{getOperationExamples([
			["arrayA", `(0 \\(("a" 1) ("b" 2)) 2)`],
			["dictionaryD", `\\(("a" 1) ("b" (0 1 2)) ("c" 3))`],
			["modifiedArrayA", `((1 "b") +3)>arrayA`, `equals (0 \\(("a" 1) ("b" 5)) 2)`],
			["modifiedDictionaryD",`(("b" 1) +3)>dictionaryD`, `equals \\(("a" 1) ("b" (0 4 2)) ("c" 3))`],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the operator <b>keySuffixSDD</b> that takes a string to the left to be appended to every key in the dictionary to the right, such that:</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">keySuffixSDD</div>, <TextEdit {...{...details, solution: keySuffix}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: + , . $ @ \ ` : ~ >",
		hint2: "Construct an over that suffixes the first member of each pair in the dictionary, then reconstruct the dictionary",
		getTestValues: () => [[suffixes[Math.floor(Math.random() * 3)], {a: 1, b: 2, c: 3}]],
		tests: [
			{description: ([suffix, dict]) => <span>{`"${suffix}"`}<b>keySuffixSDD</b>{`(${ts.toString(dict)}) equals ${ts.toString(keySuffixSDD(suffix, dict))}`}</span>, condition: ({solution, testValue: [suffix, dict]}) => JSON.stringify(keySuffixSDD(suffix, dict)) === JSON.stringify(solution(suffix, dict))},
			{description: () => <span><b>keySuffixSDD</b> uses the <a href="#greater">greater (&gt;)</a> operator</span>, condition: ({def}) => def.includes(">")},
		],
	},
};