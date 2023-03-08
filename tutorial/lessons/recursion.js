import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

function fibonacci(n) {
    if (n < 3){
        return 1;
    }else{
        return fibonacci(n-2) + fibonacci(n-1);
    }
}

export default {
	id: "recursion",
	name: "Recursion",
	operations: <React.Fragment><a href="#constant">(`) constant</a>, <a href="#cond">(?) cond</a></React.Fragment>,
	description: <div>
		<p><a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)" target="_blank">Recursion</a> is the process by which a routine calls itself.</p>
		<p>The canonical example is the <a href="https://en.wikipedia.org/wiki/Factorial" target="_blank">Factorial</a> algorithm, that gives the product of all positive integers up to a given value.</p>
		<p>In tacitscript, we can write this as:</p>
		<div className="code-block">{getOperationExamples([
			["factRecNN", "((=0 1`) .(; -1.factRecNN).*$)?"],
		])}</div>
	</div>,
	exercise: {
		question: <span>Define the operator <b>fibRecNN</b> that takes a positive integer greater than 2, and returns the nth <a href="https://en.wikipedia.org/wiki/Fibonacci_number" target="_blank">Fibonacci number</a>, starting from 1:</span>,
		getJs: ({def}) => `
/*ts
	fibRecNN ${def}
	solution fibRecNN
*/`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">fibRecNN</div>
			<TextEdit {...{...details, multiline: true, solution: "((=0 0`) (=1 1`) .(-1 -2).fibRecNN@.+$)?"}}/>
		</div>,
		getTestValues: () => [Math.floor(Math.random() * 4) + 3],
		hint1: "Use operators: + - = . $ @ ? `",
		hint2: "Find the two previous Fibonacci numbers and sum them (give literals for the first few)",
		tests: [
			{description: testValue => <span><b>fibRecNN</b>{`${testValue} equals ${fibonacci(testValue)}`}</span>, condition: ({solution, testValue}) => fibonacci(testValue) === solution(testValue)},
		],
	},
};