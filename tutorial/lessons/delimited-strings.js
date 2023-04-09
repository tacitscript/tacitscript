import TextEdit from "../components/text-edit.js";

const sumDigits = R.pipe(number => "" + number, R.split(""), R.map(digit => +digit), R.reduce(R.add, 0)); 

export default {
	id: "delimited-strings",
	name: "Delimited Strings",
	operations: <React.Fragment><a href="#chunkByDelimiter">(%) chunkByDelimiter</a></React.Fragment>,
	description: <div>
		<p>The <a href="#chunkByDelimiter">(%) chunkByDelimiter</a> operation takes a string to the left, identified as the delimiter of data contained in the string to the right.</p>
		<p>The string is broken into an array of strings contained between delimiter marks.</p>
		<div className="code-block">", "%"Alice, Bob, Eve"=("Alice" "Bob" "Eve")</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the operator <b>sumOfDigitsNN</b> that takes an integer <b>n</b> and returns the sum of digits in <b>n</b>:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">sumOfDigitsNN</div>
			<TextEdit {...{...details, multiline: true, solution: '""+.""%.0+@.+$'}}/>
		</div>,
		getTestValues: () => [Math.floor(Math.random() * 9000) + 1000],
		hint1: "Use operators: + . $ @ %",
		hint2: "",
		tests: [
			{description: testValue => <span><b>sumOfDigitsNN</b>{`${testValue} equals ${(sumDigits(testValue))}`}</span>, condition: ({solution, testValue}) => sumDigits(testValue) === solution(testValue)},
			{description: () => <span><b>sumOfDigitsNN</b> uses <a href="#percent">percent (%)</a></span>, condition: ({es6}) => es6.includes("ts.percent")},
		],
	},
};