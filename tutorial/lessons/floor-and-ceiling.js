import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const dice = [4, 6, 8, 10, 12, 20];

export default {
	id: "floor-and-ceiling",
	name: "Floor and Ceiling",
	operations: <React.Fragment><a href="#floor">([) floor</a>, <a href="#ceiling">(]) ceiling</a></React.Fragment>,
	description: <div>
		<p>The <a href="#floor">([) floor</a> operation takes a number <b>n</b> and returns the largest integer no larger than <b>n</b>.</p>
		<p>The <a href="#ceiling">(]) ceiling</a> operation take a number <b>n</b> and returns the smallest integer no smaller than <b>n</b>.</p>
		<div className="code-block">{getOperationExamples([
			["[3.1=3"],
			["](_1.8)=(_1)"],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>rollNN</b> that takes the number of sides on a regular dice, and returns the result of a roll of that dice:</span>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">rollNN</div>
			<TextEdit {...{...details, multiline: true, solution: '0?.[.+1'}}/>
		</div>,
		getTestValues: () => [dice[Math.floor(Math.random() * dice.length)]],
		hint1: "Use operators: + . [ ?",
		hint2: "Generate a random number from 1 to the number of sides, floor, and add one",
		tests: [
			{description: testValue => <span><b>rollNN</b>{`${testValue} returns an integer between 1 and ${testValue}`}</span>, condition: ({solution, testValue}) => (result => (result <= testValue) && (result >= 1) && ((result % 1) === 0))(solution(testValue))},
			{description: () => <span><b>rollNN</b> uses either <a href="#bracketleft">bracketleft ([)</a> or <a href="#bracketright">bracketright (])</a> operator</span>, condition: ({es6}) => es6.includes("ts.bracketleft") || es6.includes("ts.bracketright")},
		],
	},
};