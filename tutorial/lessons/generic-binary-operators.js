import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";

const sameLength = (left, right) => (left.length === right.length) ? 1 : 0;

export default {
	id: "generic-binary-operators",
	name: "Generic Infix Operators",
	operations: <React.Fragment><a href="#pair">(:) pair</a></React.Fragment>,
	description: <div>
		<p><a href="#custom-binary-operators">Section 10</a> outlined the derivation of new binary operators through the piping of data from existing binary operations.</p>
		<p>The <a href="#pair">(:) operation</a> takes any two operands and turns them into an array.</p>
		<div className="code-block">{getOperationExamples([
			["pairA", "+:2", "equals (+ 2)"],
		])}</div>
        <p>In practice, this provides the most general way of creating new binary operators, as we don't have to immediately process the two operands together.</p>
	</div>,
	exercise: {
		question: <span>Define the binary operator <b>sameLengthAAT</b> that takes two arrays and checks if they are the same length:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">sameLengthAAT</div>
			<TextEdit {...{...details, multiline: true, solution: ':.#@.=$'}}/>
		</div>,
		getTestValues: () => {
            // lets get two lengths
			const lengths = R.times(() => Math.floor(Math.random() * 3) + 3, 2);

			return [
                R.times(() => R.times(() => Math.floor(Math.random() * 10), lengths[0]), 2), // same length
                [R.times(() => Math.floor(Math.random() * 10), lengths[1]), R.times(() => Math.floor(Math.random() * 10), lengths[1] + 1)], // off by one
            ];
		},
        hint1: "Use operators: = . $ # @ :",
		hint2: "pair, then length map, the equality reduce",
		tests: R.times(() => ({
			description: ([a, b]) => <span>{ts.toString(a)}<b>sameLengthAAT</b>{`${ts.toString(b)} equals ${sameLength(a, b)}`}</span>,
			condition: ({solution, testValue}) => sameLength(...testValue) === solution(...testValue),
		}), 2),
	},
};