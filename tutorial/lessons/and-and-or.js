import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "and-and-or",
	name: "AND and OR",
	operations: <React.Fragment><a href="#andValue">(&) andValue</a>, <a href="#orValue">(|) orValue</a></React.Fragment>,
	description: <div>
		<p>Logic operations <a href="#andValue">(&) andValue</a> and <a href="#orValue">(|) orValue</a> check the <a href="#filtering">truthiness</a> of the value on the left.</p>
		<p>If <i>true</i>, <b>andValue</b> returns the value on the right; otherwise, the value on the left.</p>
		<div className="code-block">{getOperationExamples([
			['1&"hello"="hello"'],
			['( )&3=( )'],
		])}</div>
		<p>If <i>true</i>, <b>orValue</b> returns the value on the left; otherwise, the value on the right.</p>
		<div className="code-block">{getOperationExamples([
			['1|"hello"=1',],
			['\( )|""=""'],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>To convert a boolean value to the string <i>"true"</i> or <i>"false"</i>, we could use a <a href="#cond">(?) cond</a> expression such as <span className="code">((; "true"`) "false"`)?</span></div>
			<p>Define <b>truthToStringTS</b> using the operators introduced above, and avoiding cond:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">truthToStringTS</div>
			<TextEdit {...{...details, multiline: true, solution: '&"true".|"false"'}}/>
		</div>,
		hint1: "Use operators: . & |",
		hint2: 'AND "true" then OR "false"',
		tests: [
			{description: <span><b>truthToStringTS</b>!() equals "true"</span>, condition: ({solution}) => solution(true) === "true"},
			{description: <span><b>truthToStringTS</b>() equals "false"</span>, condition: ({solution}) => solution(false) === "false"},
			{description: <span><b>truthToStringTS</b> uses <a href="#and">ampersand (&)</a></span>, condition: ({es6}) => es6.includes("ts.ampersand")},
			{description: <span><b>truthToStringTS</b> uses <a href="#bar">bar (|)</a></span>, condition: ({es6}) => es6.includes("ts.bar")},
			{description: <span><b>truthToStringTS</b> does <i>not</i> use <a href="#question">question (?)</a></span>, condition: ({es6}) => !es6.includes("ts.question")},
		],
	},
};