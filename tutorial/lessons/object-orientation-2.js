import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import commonStyles from "../styles/common-styles.js";

const {equationStyle} = commonStyles;
const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const bounds = solution => `:.(
	(].="widthN" [.(1' ]).-$)
	(].="heightN" [.(2' [).-$)
	(].="boundedUT" ${solution})
	()\`
)?`;
const es6 = ts2es6(`/*ts
	boundsASN		${bounds("")}
*/`);
eval(es6.replace(/const /g, "var "))

export default {
	id: "object-orientation-2",
	name: "Object Orientation 2",
	description: <div>
		<p>Let's add a <span className="code">dotProductUN</span> method to our vector implementation, that takes an additional vector and returns the dot product of the two. The dot product tells us how closely two vectors align.</p>
		<div className="equation" {...equationStyle}><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/69f8ac1d2b7ffb9ef70bb6b151a4b931f20087a5"/></div>
		<div className="code-block">{getOperationExamples([
			["vectorASN", `:.(
	(].="xN" [.[)
	(].="yN" [.])
	(].="magN" [.^2@.+$.^0.5)
	(].="dotProductUN" :,([ @("x" "y")).*$.*$@.+$)
	()\`
)?`],
			["dotProductN", `(3 4)vectorASN"dotProductUN"((2 _1)vectorASN)`, <span>equals <span className="code">(3 * 2) + (4 * _1) = 2</span></span>],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the boundsASN method <b>boundedUT</b> that takes one of our new vector objects and returns whether this vector, when anchored at the origin, ends within bounds.</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">boundsASN</div>, <TextEdit {...{...details, multiline: true, solution: bounds}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - = . $ ] [ ' ? :",
		hint2: "Pair the array and method call, cond the options remembering default implementation for unknown methods",
		getTestValues: () => R.map(R.pipe(R.times(Math.random), R.map(R.pipe(R.multiply(10), Math.floor)), R.sortBy(R.identity), ([a, b, c, d]) => [a, d, c, b]))([4, 4, 4, 4]),
		tests: [
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"width" equals {boundsASN(details, "width")}</span>, condition: ({solution, testValue}) => boundsASN(testValue, "width") === solution(testValue, "width")},
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"height" equals {boundsASN(details, "height")}</span>, condition: ({solution, testValue}) => boundsASN(testValue, "height") === solution(testValue, "height")},
			{description: details => <span>{ts.toString(details)}<b>boundsASN</b>"unknown" equals ()</span>, condition: ({solution, testValue}) => boundsASN(testValue, "unknown") === undefined},
		],
	},
};