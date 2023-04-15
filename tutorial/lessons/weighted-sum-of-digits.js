import TextEdit from "../components/text-edit.js";

const weightedSumOfDigits = R.pipe(x => "" + x, R.split(""), R.map(x => +x), x => x.map((value, index) => value * (index + 1)), R.reduce(R.add, 0));

export default {
	id: "weighted-sum-of-digits",
	name: "Weighted Sum of Digis",
	exercise: {
		question: <div>
			<div>Define the operator <b>weightedSumOfDigitsNN</b> that takes a positive integer and sums all digits weighted by by their index, starting at 1.</div>
			<p>For instance, <span className="code">weightedSumOfDigitsNN5201 = (5 * 1) + (2 * 2) + (0 * 3) + (1 * 4) = 13</span></p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">weightedSumOfDigitsNN</div>
			<TextEdit {...{...details, multiline: true, solution: '""+.""%.0+@.(; #.(+1` ;).^$).*$.*$@.+$'}}/>
		</div>,
		getTestValues: () => [Math.floor(Math.random() * 10000)],
		hint1: "Use operators: + * . $ # % @ ; ` ^",
		hint2: "Convert to string, split to characters, convert to digits, zip with 1-based sequence and times-reduce-map, then sum",
		tests: [
			{description: testValue => <span><b>weightedSumOfDigitsNN</b>{`${testValue} equals ${weightedSumOfDigits(testValue)}`}</span>, condition: ({solution, testValue}) => weightedSumOfDigits(testValue) === solution(testValue)},
		],
	},
};