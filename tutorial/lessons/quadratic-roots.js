import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import getOperationExamples from "../logic/get-operation-examples.js";
import Table from "../components/table.js";

const {css} = Glamor;

const equationStyle = css({
	display: "flex",
	justifyContent: "center",
	"> img": {
		backgroundColor: "white",
		border: "5px solid white",
		borderRadius: "5px",
	},
});
const getRandomSign = () => (Math.floor(Math.random() * 2) * 2) - 1;
const roots = ([a, b, c]) => (sqrt => [-b + sqrt, -b - sqrt].map(x => x / (2 * a)))(Math.sqrt(b * b - (4 * a * c)));

export default {
	id: "quadratic-roots",
	name: "Parameter Manipulation",
	operations: <React.Fragment>(<a href="#flip">(~) flip</a>)</React.Fragment>,
	description: <div>
		<p>Certain programming languages are optimized for solving certain kinds of problems. All languages have particular strengths and weaknesses, and it is good to know where these strengths and weaknesses lie.</p>
		<p>Having no explicit arguments, point-free languages will struggle with problems that require arguments to be processed and combined in different ways.</p>
		<p>A good example of this is the famous formula for calculating the <a href="https://en.wikipedia.org/wiki/Quadratic_equation" target="_blank">roots of a quadratic equation</a></p>
		<div className="equation" {...equationStyle}><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/00c22777378f9c594c71158fea8946f2495f2a28"/></div>
		<p>Given array <b>(a b c)</b> we can define <b>sqrtAN</b> to calculate the square-rooted component of the equation above, as:</p>
		<div className="code-block">{getOperationExamples([
			["sqrtAN", ".(1'.^2 .([ ]).*$.*4).-$.^0.5"],
		])}</div>
		<p>The indirect manner in which arguments are referenced and combined illustrates a potential pitfall of the point-free style.</p>
	</div>,
	exercise: {
		question: <div>
			<div>Using <b>sqrtAN</b>, define <b>rootsAA</b> that takes an array <b>(a b c)</b> and returns the roots of the respective quadratic equation (assume both roots will be real):</div>
		</div>,
		getJs: ({def}) => `/*ts
			sqrtAN		.(1'.^2 .([ ]).*$.*4).-$.^0.5
			solution	${def}
		*/`,
		getHtml: details => <div><br/><Table className="multiple-line">{[
			[<div className="name">sqrtAN</div>,<div className="expression">.(1'.^2 .([ ]).*$.*4).-$.^0.5</div>],
			[<div className="name">rootsAA</div>, <TextEdit {...{...details, solution: ".([.*2.~/ .(1'._.+ sqrtAN.(; _1*)).@$).@$"}}/>],
		]}</Table></div>,
		getTestValues: () => R.pipe(
			R.sortBy(Math.random),
			R.slice(1, Infinity),
			R.map(([a, b, c]) => {
				const acMultiple = getRandomSign();
				const bMultiple = getRandomSign();

				return [a * acMultiple, b * bMultiple, c * acMultiple];
			}),
		)([[1, 2, -15], [4, 4, -3], [2, -1, -1]]),
		hint1: "Use operators: + * / _ . $ ; @ [ ' ~ sqrtAN",
		hint2: "map /2a on (map -b+ on +/- sqrt block)",
		tests: [
			...R.times(() => ({description: testValue => <span><b>rootsAA</b>{`${ts.toString(testValue)} equals ${ts.toString(roots(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(roots(testValue)) === JSON.stringify(solution(testValue))}), 2),
			{description: () => <span><b>rootsAA</b> uses <b>sqrtAN</b></span>, condition: ({def}) => def.includes("sqrtAN")},
		],
	},
};