import TextEdit from "../components/text-edit.js";

const {css} = Glamor;

const style = css({
	" .console": {
		whiteSpace: "nowrap",
		marginRight: "1rem",
	},
	"> .rule": {
		margin: "1rem 0",
	},
	"> .output": {
		marginTop: "0.5rem",
		"> .prompt": {
			marginRight: "0.5rem",
		},
	},
});

export default {
	id: "fizzbuzz",
	name: "Fizzbuzz: (^) generate, (&) andPredicate, (\`) constant, (;) identity, (?) cond, (@) map, (>) tap, ({) eval",
	exercise: {
		question: <div>
			<p><i>Fizzbuzz</i> is a popular interview question.</p>
			<p>Define the expression <b>fizzbuzz</b> that generates:</p>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div {...style}>
			<div className="single-line name-expression">
				<div className="name">fizzbuzz</div>
				<TextEdit {...{...details, multiline: true, solution: `0+.+1.""+`}}>
					<div className="console">{`>({"console.log")`}</div>
				</TextEdit>
			</div>
			<div className="rule"/>
			<div className="console-title">CONSOLE</div>
			<div className="output">
				<span className="prompt">&gt;</span>
				<span>{details.solution}</span>
			</div>
		</div>,
		getTestValue: index => `${(Math.floor(Math.random() * 1000) * (index ? 1 : -1)) / 10}`.replace(/-/, "_"),
		hint1: "Use operators: . +",
		hint2: "convert to number, increment, convert to string",
		tests: [
			{description: `an array of length 100`, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue).replace(/_/, "-") - testValue.replace(/_/, "-") - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
			{description: `where every third element has "Fizz"`, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue) - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
			{description: `where every fifth element has "Buzz"`, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue) - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
			{description: `where elements at a multiple of both three and five have "FizzBuzz"`, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue) - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
			{description: `where remaining elements have the element index (starting with 1)`, condition: ({solution, testValue}) => {
				try {
					return Math.abs(+solution(testValue) - testValue - 1) < 1E-10;
				} catch (e) {
					return false;
				}
			}},
		],
	},
};