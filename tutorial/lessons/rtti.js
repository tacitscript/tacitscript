import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const array = [1, [2, 3, [4]], [5]];

export default {
	id: "runtime-type-information",
	name: "Run-time Type Information (RTTI)",
	operations: <React.Fragment><a href="#typeof">({"}"}) typeof</a></React.Fragment>,
	description: <div>
		<p>RTTI allows us to interrogate the type of an object, typically before we decide how to handle it.</p>
		<p>tacitscript will return the type as a single character string, according to the table shown at the bottom of <a href="#type-signatures">Appendix B</a>.</p>
		<div className="code-block">{"}"}23="N"</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>flattenAA</b> that takes an array containing a hierarchy of arrays, and returns the array with contents flattened into a single layer:</span>,
		getJs: ({def}) => `
/*ts
	flattenAA ${def}
	solution flattenAA
*/`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">flattenAA</div>
			<TextEdit {...{...details, multiline: true, solution: `((}.="A" flattenAA) ;)?@.{`}}/>
		</div>,
		getTestValues: () => [array],
		hint1: "Use operators: = . @ ? { }",
		hint2: "Map (if an array, then recurse, otherwise identity) then unnest",
		tests: [
			{description: testValue => <span><b>flattenAA</b>{`${ts.toString(testValue)} equals ${ts.toString(R.flatten(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(R.flatten(testValue)) === JSON.stringify(solution(testValue))},
		],
	},
};