import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const getState = () => (value => (value === 0) ? "R" : (value === 1) ? "P" : "S")(Math.floor(Math.random() * 3));
const getGame = () => getState() + getState();
const getMatch = () => R.pipe(R.times(getGame), R.join(" "))(Math.floor(Math.random() * 6) + 4);

const winner = results => {
	const round = pair => {
		switch(pair) {
			case "SS":
			case "PP":
			case "RR":
				return 0;

			case "RS":
			case "SP":
			case "PR":
				return -1;
		}

		return 1;
	};
	const match = R.pipe(R.split(" "), R.map(round), R.reduce(R.add, 0));
	const whoWins = score => score < 0 ? 1 : (score > 0) ? 2 : 0;

	return R.pipe(match, whoWins)(results);
};

export default {
	id: "rock-paper-scissors",
	name: "Rock Paper Scissors",
	exercise: {
		question: <div>
			<div>You are given the results of a string of <a href="https://en.wikipedia.org/wiki/Rock_paper_scissors" target="_blank">Rock paper scissors</a> games played between two players.</div>
			<p>Each pair of characters represents a single game between player 1 and 2; <b>R</b>, <b>P</b> and <b>S</b> represent the three states played.</p>
			<p>Write a freeform, multiline program defining <b>winnerSN</b> that takes the results and returns the number of the winning player (or <b>0</b> for a draw):</p>
		</div>,
		getJs: ({def}) => `/*ts
			${def} 
			solution winnerSN
		*/;`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><div className="single-line"><TextEdit {...{...details, multiline: true, solution: `roundSN         ((""%.=$ 0\`) (="RS"|(="SP")|(="PR") _1\`) 1\`)?
matchSN         " "%.roundSN@.+$
whoWinsNN       ((<0 1\`) (>0 2\`) 0\`)?
winnerSN        matchSN.whoWinsNN`}}/></div></React.Fragment>,
		getTestValues: () => R.times(getMatch, 3),
		hint1: "Use operators: + _ = $ . @ < > ? ` % |",
		hint2: "For each game, check if player 1 wins and assign a score of _1; 1 for player 2 win. Sum scores to determine overall score.",
		tests: [
			...R.times(() => ({description: testValue => <span><b>winnerSN</b>{`"${ts.toString(testValue)}" equals ${winner(testValue)}`}</span>, condition: ({solution, testValue}) => winner(testValue) === solution(testValue)}), 3),
			{description: <span>The solution is a multiline program</span>, condition: ({def}) => def.includes("\n")},
		],
	},
};