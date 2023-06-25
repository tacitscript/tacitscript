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
	(].="boundedUT" ${solution})
	()\`
)?`;
const boundedUT = `:._,(@("xN" "yN") [,(<|= >|= >|= <|=).(.(1' ]).&$ .([ 2').&$)).*$.(,$)@.&$`;
const es6 = ts2es6(`/*ts
	vectorASQ		:.(
						(].="xN" [.[)
						(].="yN" [.])
						(].="dotProductUN" :,([ @("x" "y")).*$.*$@.+$)
						()\`
					)?
	boundsASN		${bounds(boundedUT)}
*/`);
eval(es6.replace(/const /g, "var "))

const tests = [
	([a, b, c, d, e, f]) => [[a, e, f, b], [c, d]],
	([a, b, c, d, e, f]) => [[a, c, f, b], [e, d]],
	([a, b, c, d, e, f]) => [[d, e, f, b], [c, a]],
	([a, b, c, d, e, f]) => [[d, c, f, b], [e, a]],
];

export default {
	id: "object-orientation-2",
	name: "Object Orientation 2",
	description: <div>
		<p>Let's add a <span className="code">dotProductUN</span> method to our vector implementation, that takes an additional vector and returns the dot product of the two. The dot product tells us how closely two vectors align.</p>
		<div className="equation" {...equationStyle}><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/69f8ac1d2b7ffb9ef70bb6b151a4b931f20087a5"/></div>
		<br/>
		<div className="code-block">{getOperationExamples([
			["vectorASQ", `:.(
	(].="xN" [.[)
	(].="yN" [.])
	(].="dotProductUN" :,([ @("xN" "yN")).*$.*$@.+$)
	()\`
)?`],
			["dotProductN", `(3 4)vectorASQ"dotProductUN"((2 _1)vectorASQ)`, <span>equals <span className="code">(3 * 2) + (4 * _1) = 2</span></span>],
		])}</div>
		<p><i>Note that, for clarity, we will exclude methods not under investigation in our current definitions.</i></p>
	</div>,
	exercise: {
		question: <div>
			<div>Define the boundsASN method <b>boundedUT</b> that takes one of our new vector objects and returns whether this vector, when anchored at the origin, ends within bounds.</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${bounds(def)}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">boundsASN</div>, <div className="expression">:.(</div>],
			[<div className="name"></div>, <pre style={{display: "flex"}}>    (].="boundedUT" <TextEdit {...{...details, multiline: true, solution: boundedUT}}/>)</pre>],
			[<div className="name"></div>, <pre>    ()`</pre>],
			[<div className="name"></div>, <pre>)?</pre>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: * , _ = . $ @ : [ ] < > ' & |",
		hint2: "Pair to vector, reverse, map the vector to extract x and y, convert bounds to conditions and apply against vector",
		getTestValues: () => R.map(R.pipe(R.times(Math.random), R.map(R.pipe(R.multiply(10), Math.floor)), R.sortBy(R.identity)))([6, 6, 6, 6]),
		tests: R.times(i => {
			return {
				description: details => {
					const [b, v] = tests[i](details);

					return <span>{ts.toString(b)}boundsASN<b>"boundedUT"</b>({ts.toString(v)}vectorASQ) equals {boundsASN(b, "boundedUT")(s => vectorASQ(v, s))}</span>;
				},
				condition: ({solution, testValue}) => {
					const [b, v] = tests[i](testValue);
					
					return boundsASN(b, "boundedUT")(s => vectorASQ(v, s)) === solution(b, "boundedUT")(s => vectorASQ(v, s));
				},
			};
		}, 4),
	},
};