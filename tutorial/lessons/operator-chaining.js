import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const fToC = value => (value - 32) / 9 * 5;

export default {
	id: "f",
	name: "Operator Chaining",
	description: <div>
		<p>The <a href="#pipe">(.) pipe</a> operation takes a unary operator to the left and right. The resulting operator passes a value through the left operator, then feeds the result through the right operator.</p>
		<div className="code-block">{`halfAddOne\t/2.+1\ncalculation\thalfAddOne4\t\t\t\t\tequals 3`}</div>
		<p>The <a href="#dot">dot (.)</a> and <a href="#comma">comma (,)</a> operators have lowest precedence, so parentheses are not required around <span className="code">+1</span> above.</p>
	</div>,
	exercise: {
		question: <div>
			<div>To convert from Farenheit to Celsius, we subtract 32, divide by 9, then multiply by 5.</div>
			<div>Define the operator <b>fToC</b> such that:</div>
		</div>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">fToC</div>
			<TextEdit {...{...details, multiline: true, solution: "-32./9.*5"}}/>
		</div>,
		getTestValue: () => Math.floor(Math.random() * 99) + 1,
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>fToC</b>{`${testValue} equals ${toDecimalPlaces(fToC(testValue), 4)}`}</span>, condition: ({solution, testValue}) => {
				if (typeof solution !== "function") return false;

				try {
					return Math.abs(solution(testValue) - fToC(testValue)) < 1E-10;
				} catch (ex) {
					return false;
				}
			}},
		],
	},
};