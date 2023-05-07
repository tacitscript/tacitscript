import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const getTwoRandom = () => R.times(() => Math.floor(Math.random() * 9) + 1, 2);
const isValidTriangle = R.pipe(R.sortBy(R.identity), ([a, b, c]) => c <= (a + b));

export default {
	id: "valid-triangle",
	name: "Valid Triangle",
	exercise: {
		question: <div>
			<div>You will be given the lengths of three sides of a triangle <span className="code">(a b c)</span> and need to determine whether the triangle can be constructed or not.</div>
			<p>Note that the longest side of a triangle must not be greater that the sum of the other two sides. (If it is equal to the other two sides, then the vertices are along a line, but the triangle is still valid.)</p>
			<p>Define <b>isValidTriangleAT</b> such that:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">isValidTriangleAT</div>
			<TextEdit {...{...details, multiline: true, solution: `;<.2%,(+$ [).!<$`}}/>
		</div>,
		getTestValues: () => [
			(([a, b]) => [a, b, a + b - 1])(getTwoRandom()),
			(([a, b]) => [a, b, a + b + 1])(getTwoRandom()),
			(([a, b]) => [a, b, a + b])(getTwoRandom()),
		],
		hint1: "Use operators: + , . $ ; % < [ !",
		hint2: "sort and sum the two smallest numbers to compare with largest",
		tests: R.times(() => ({description: testValue => <span><b>isValidTriangleAT</b>{`${ts.toString(testValue)} equals ${ts.toString(isValidTriangle(testValue))}`}</span>, condition: ({solution, testValue}) => isValidTriangle(testValue) === solution(testValue)}), 3),
	},
};