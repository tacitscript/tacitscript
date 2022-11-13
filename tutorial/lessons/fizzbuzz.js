import TextEdit from "../components/text-edit.js";

const {css} = Glamor;

const style = css({
	" .console": {
		whiteSpace: "nowrap",
		marginRight: "1rem",
		alignSelf: "flex-end",
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
		getJs: def => `const solution = /*ts (${def} ${def},""+) */;`,
		getHtml: details => <div {...style}>
			<div className="single-line name-expression">
				<div className="name">fizzbuzz</div>
				<TextEdit {...{...details, multiline: true, solution: `0+.+1.""+`}}>
					<div className="console">{`,""+.>({"console.log")`}</div>
				</TextEdit>
			</div>
			<div className="rule"/>
			<div className="console-title">CONSOLE</div>
			<div className="output">
				<span className="prompt">&gt;</span>
				<span>{R.pathOr("ERROR", ["solution", 1], details)}</span>
			</div>
		</div>,
		getTestValue: index => `${(Math.floor(Math.random() * 1000) * (index ? 1 : -1)) / 10}`.replace(/-/, "_"),
		hint1: "Use operators: & @ ` , . = ^ % + ? ;",
		hint2: "generate 1 to 100, map over array replacing values appropriately",
		tests: [
			{description: `an array containing integers 1 to 100 (inclusive), except`, condition: ({solution, testValue}) => {
				try {
					return (solution[0].length === 100) && R.addIndex(R.all)((value, i) => {
						const index = i + 1;

						if (((index % 3) !== 0) && ((index % 5) !== 0)) return value === index;
						return true;
					}, solution[0]);
				} catch (e) {
					return false;
				}
			}},
			{description: `for multiples of three, show "Fizz"`, condition: ({solution, testValue}) => {
				try {
					return R.addIndex(R.all)((value, i) => {
						const index = i + 1;

						if (((index % 3) === 0) && ((index % 5) !== 0)) return value === "Fizz";
						return true;
					}, solution[0]);
				} catch (e) {
					return false;
				}
			}},

			{description: `for multiples of five, show "Buzz"`, condition: ({solution, testValue}) => {
				try {
					return R.addIndex(R.all)((value, i) => {
						const index = i + 1;

						if (((index % 3) !== 0) && ((index % 5) === 0)) return value === "Buzz";
						return true;
					}, solution[0]);
				} catch (e) {
					return false;
				}
			}},
			{description: `for multiples of both three and five, show "FizzBuzz"`, condition: ({solution, testValue}) => {
				try {
					return R.addIndex(R.all)((value, i) => {
						const index = i + 1;

						if (((index % 3) === 0) && ((index % 5) === 0)) return value === "FizzBuzz";
						return true;
					}, solution[0]);
				} catch (e) {
					return false;
				}
			}},
		],
	},
};