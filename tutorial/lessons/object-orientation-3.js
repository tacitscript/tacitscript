import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const bounds = solution => `.(: (
	(].="detailsA" [)
	(].="unionUU" ${solution})
	()\`
)?\`).(.$)`;
const unionUU = `:,([ "detailsA",).*$.;<@,([ ] ] [).boundsAU`;
const es6 = ts2es6(`/*ts
	boundsAU		${bounds(unionUU)}
*/`);
eval(es6.replace(/const /g, "var "))

export default {
	id: "object-orientation-3",
	name: "Object Orientation 3",
	description: <div>
		<p>Finally, lets add the <span className="code">addUU</span> method to our vector. This takes an additional vector and returns the vector sum.</p>
		<p>Now that we are returning a vector, our constructor definition will reference itself, making it recursive. As <a href="#recursion">noted</a>, recursive operators must be unary. (The reason for this is the requirement that all tacitscript operators are fixed unary or binary, and the ambiguity in deducing this when the operator is recursive.)</p>
		<p>However, using runtime operator construction, we can restructure the object definition to accommodate this restriction.</p>
		<div className="code-block">{getOperationExamples([
			["vectorAU", `.(: (
    (].="xN" [.[)
    (].="yN" [.])
    (].="magN" [.^2@.+$.^0.5)
    (].="addUU" :,([ @("xN" "yN")).*$.+$@.vectorAU)
    ()\`
)?\`).(.$)`],
			["magN", `vectorAU(1 2)"addUU"(vectorAU(2 2))"magN"`, "equals 5"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define the boundsAU method <b>unionUU</b> that takes an additional bounds object and returns the boundary union (coordinates encompasing both bound objects.)</div>
			<p>Method <span className="code">detailsA</span> has been added to expose the construction details of the bounds object as an array.</p>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${bounds(def).replace(/boundsAU/g, "solution")}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">boundsAU</div>, <div className="expression">.(: (</div>],
			[<div className="name"></div>, <pre>    (].="detailsA" [)</pre>],
			[<div className="name"></div>, <pre style={{display: "flex"}}>    (].="unionUU" <TextEdit {...{...details, multiline: true, solution: unionUU}}/>)</pre>],
			[<div className="name"></div>, <pre>    ()`</pre>],
			[<div className="name"></div>, <pre>)?`).(.$)</pre>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: * , . $ @ < [ ] : boundsAU",
		hint2: "Pair to new bounds, zip two arrays of details, sort and extract the min or max of each coordinate appropriately, then construct new bounds object",
		getTestValues: () => R.map(R.pipe(R.times(Math.random), R.map(R.pipe(R.multiply(10), Math.floor)), R.splitAt(4), R.map(R.pipe(R.sortBy(R.identity), ([a, b, c, d]) => [a, c, d, b]))))([8, 8, 8]),
		tests: R.times(() => {
			return {
				description: ([b1, b2]) => <span>boundsAU{ts.toString(b1)}<b>"unionUU"</b>(boundsAU{ts.toString(b2)})"detailsA" equals {ts.toString(boundsAU(b1)("unionUU")(boundsAU(b2))("detailsA"))}</span>,
				condition: ({solution, testValue: [b1, b2]}) => JSON.stringify(boundsAU(b1)("unionUU")(boundsAU(b2))("detailsA")) === JSON.stringify(solution(b1)("unionUU")(boundsAU(b2))("detailsA")),
			};
		}, 3),
	},
};