import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const root = ([i, N]) => {
	let A = 1;

	for (let j= 0; j < i; j += 1) {
		A = ((N / A) + A) / 2;
	}

	return +A.toFixed(3);
};

export default {
	id: "inverting-pipelines",
	name: "Inverting Pipelines",
	operations: <React.Fragment>(<a href="#binaryUnaryApply">(,) binaryUnaryApply</a>)</React.Fragment>,
	description: <div>
		<p>We've seen <a href="#custom-operators">previously</a> that we can generate new operators by <i>baking-in</i> arguments to binary operators.</p>
		<p>Suppose we want to create the operator <b>lengthLessThan</b> that takes an integer <b>n</b> and returns an operator that checks if a vector has fewer than <b>n</b> elements.</p>
		<p>One solution would be to create a binary operator that defines the two arguments up front. Due to partial application, it can be used to accept one argument at a time, as required:</p>
		<div className="code-block">{getOperationExamples([
			["lengthLessThanNCT", ":._,(# >).(,$)", "(3,lengthLessThanNCT)(7 8 9)=0"],
		])}</div>
		<p>It's somewhat obscure to follow the logic. We can more directly define a unary operator that returns another unary operator by <i>inverting</i> the operation pipeline as follows:</p>
		<div className="code-block">{getOperationExamples([
			["lengthLessThanNU", ">,(#.)", "lengthLessThanNU3(7 8 9)=0"],
		])}</div>
		<p>The length limit condition is set by application. This is then applied to the end of an operator pipeline that requests a vector.</p>
	</div>,
	exercise: {
		question: <div>
			<div><a href="https://www.school-for-champions.com/algebra/square_root_approx.htm" target="_blank">Newton's square root approximation</a> involves taking an initial approximation <b>A</b> for the square root of <b>N</b>, then iterating to improve the approximation. Subsequent approximations are given by <b>A' = (N/A + A) / 2</b>.</div>
			<p>Define to operator <b>rootAN</b> that takes an array containing:</p>
			<ol>
				<li>the number of iterations <b>i</b>, and</li>
				<li>the number whose square root is to be calculated</li>
			</ol>
			<p>and iterates an approximation <b>i</b> times, with a starting value of <b>1</b>, giving the answer to 3 decimal places:
			</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">rootAN</div>
			<TextEdit {...{...details, multiline: true, solution: `,(+1.>,(#.) :,(; ]).(] /$).+$./2).^(1 ).].3'`}}/>
		</div>,
		getTestValues: () => [[Math.floor(Math.random() * 11), Math.floor(Math.random() * 98) + 2]],
		hint1: "Use operators: + / , . $ # > : ] ^ '",
		hint2: "zip apply to iteration conditional and next value calculation, take last value to 3dp",
		tests: [
			{description: testValue => <span><b>rootAN</b>{`${ts.toString(testValue)} equals ${root(testValue)}`}</span>, condition: ({solution, testValue}) => Math.abs(root(testValue) - solution(testValue)) < 1e-10},
			{description: <span><b>rootAN</b> uses a pipeline inversion</span>, condition: ({def}) => def.includes(".)")},
		],
	},
};