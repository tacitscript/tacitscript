import TextEdit from "../components/text-edit.js";
import Table from "../components/table.js";

const cardName = value => `${["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"][value % 13]}-of-${["Clubs", "Spades", "Diamonds", "Hearts"][Math.floor(value / 13)]}`;

export default {
	id: "card-name",
	name: "Card Name",
	exercise: {
		question: <div>
			<div>We index every card in a standard deck from 0 to 51, by arranging them in order within each suit: 2, 3, 4, ..., 9, 10, Jack, Queen, King, Ace; and ordering the suits: Clubs, Spades, Diamonds, Hearts.</div>
			<p>Given arrays of <b>ranks</b> and <b>suits</b>, define the operator <b>cardNameNS</b> that takes an index and returns the name of the card in the form <b>Jack-of-Spades</b>:</p>
		</div>,
		getJs: ({def}) => `/*ts
suitsA      ("Clubs" "Spades" "Diamonds" "Hearts")
ranksA      ("2" "3" "4" "5" "6" "7" "8" "9" "10" "Jack" "Queen" "King" "Ace")
solution	${def}
*/`,
		getHtml: details => <div><br/><div className="rule"/><br/><Table className="multiple-line">{[
			[<div className="name">ranksA</div>,<div className="expression">("2" "3" "4" "5" "6" "7" "8" "9" "10" "Jack" "Queen" "King" "Ace")</div> ],
			[<div className="name">suitsA</div>,<div className="expression">("Clubs" "Spades" "Diamonds" "Hearts")</div> ],
			[<div className="name">cardNameNS</div>, <TextEdit {...{...details, solution: `.(%13.'ranksA /13.[.'suitsA)."-of-"$`}}/>],
		]}</Table></div>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 52), 3),
		hint1: "Use operators: / . $ % ' [",
		hint2: "Fork to rank calculation with remainder, and suit with division and flooring, then join with a string between the two values",
		tests: R.times(() => ({description: testValue => <span><b>cardNameNS</b>{`${testValue} equals "${cardName(testValue)}"`}</span>, condition: ({solution, testValue}) => cardName(testValue) === solution(testValue)}), 3),
	},
};