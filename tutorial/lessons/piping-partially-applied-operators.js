import TextEdit from "../components/text-edit.js";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const ranks = "23456789TJQKA".split("");
const deck = R.unnest("CSDH".split("").map(suit => ranks.map(rank => `${suit}${rank}`)));

export default {
	id: "piping-partially-applied-operators",
	name: "Piping Paritally Applied Operators",
	operations: <React.Fragment><a href="#binaryUnaryApply">(,) binaryUnaryApply</a></React.Fragment>,
	description: <div>
		<p><a href="#binaryUnaryApply">(,) binaryUnaryApply</a> takes a binary operator to the left, and a higher order unary operator to the right. The pipeline created accepts a value that is partially applied on the left, with the resulting operator applied to the right.</p>
		<p>The following operator accepts an integer <b>n</b> and returns the three integers starting with <b>n</b>.</p>
		<div className="code-block">{getOperationExamples([
			["threeStartingAtNA", "+,^3", "threeStartingAtNA7=(7 8 9)"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Let's arrange a normal deck of playing cards in order of suits: <b>C</b>lubs, <b>S</b>pades, <b>D</b>iamonds, <b>H</b>earts.</div>
			<p>Within each suit, let's order the cards <b>2</b>, <b>3</b>, <b>4</b>, ..., <b>T</b>en, <b>J</b>ack, <b>Q</b>ueen, <b>K</b>ing, <b>A</b>ce.</p>
			<p>Each card is referenced by a two-character code, eg. Jack-of-Clubs is <b>JC</b>.</p>
			<p>Given the characters for suits and ranks, define <b>deckA</b>, the array of all card codes in order:</p>
		</div>,
		getJs: ({def}) => `/*ts
suitsA      ""%"CSDH"
ranksA      ""%"23456789TJQKA"
solution	${def}
*/`,
		getHtml: details => <div><br/><div className="rule"/><br/><Table className="multiple-line">{[
			[<div className="name">suitA</div>,<div className="expression">""%"CSDH"</div> ],
			[<div className="name">ranksA</div>,<div className="expression">""%"23456789TJQKA"</div> ],
			[<div className="name">deckA</div>, <TextEdit {...{...details, solution: `(+,@ranksA)@suitsA,+$`}}/>],
		]}</Table></div>,
		hint1: "Use operators: + , $ @",
		hint2: "Map over suits, append suit character to all ranks through a map, and concatenate arrays",
		tests: [{description: <span><b>deckA</b> equals ("2C" "3C" "4C" ... "QH" "KH" "AH")</span>, condition: ({solution}) => JSON.stringify(deck) === JSON.stringify(solution)}],
	},
};