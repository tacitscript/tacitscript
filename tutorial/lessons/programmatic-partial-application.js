import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const range = (low, high) => R.times(x => low + x, high - low);

export default {
	id: "programmatic-partial-application",
	name: "Programmatic Partial Application",
	operations: <React.Fragment><a href="#unaryBinaryPipe">(.) unaryBinaryPipe</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>rangeNNA</b> that takes two integers and generates the array containing all integers between the two, inclusive of the first, but exclusive of the second:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">rangeNNA</div>
			<TextEdit {...{...details, multiline: true, solution: `:.([.+ _.-$).^$`}}/>
		</div>,
		getTestValues: () => [(() => {
			const start = Math.floor(Math.random() * 9) + 1;
			const length = Math.floor(Math.random() * 9) + 1;;

			return [start, start + length];
		})()],
		hint1: "Use operators: + - _ . $ [ ^ :",
		hint2: "Pair, create generator from lower value and raise to power of difference",
		tests: [
			{description: ([low, high]) => <span>{low}<b>rangeNNA</b>{`${high}`} equals {ts.toString(range(low, high))}</span>, condition: ({solution, testValue: [low, high]}) => JSON.stringify(range(low, high)) === JSON.stringify(solution(low, high))},
		],
	},
};