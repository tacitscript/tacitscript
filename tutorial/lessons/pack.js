import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }
const pack = string => string.split("").reduce((acc, char) => {
	if (R.isEmpty(acc)) return [char];

	if (acc[acc.length - 1][0] === char) return [...acc.slice(0, -1), [...acc[acc.length - 1], acc[acc.length - 1][0]].join("")];

	return [...acc, char];
}, []);

export default {
	id: "pack",
	name: "Pack",
	operations: <React.Fragment><a href="#notBinary">(!) notBinary</a>, <a href="#chunkWithComparator">(%) chunkWithComparator</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>In this and the following two sections, we'll develop a compression encoding algorithm for strings contain many sequences of repeated characters.</div>
			<p>Define the operator <b>packSA</b> that splits a string into blocks of repeated characters, such that:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">packSA</div>
			<TextEdit {...{...details, multiline: true, solution: `!=%`}}/>
		</div>,
		getTestValues: () => [(() => {
			const letters = shuffle("abcde".split(""));

			return letters.map(char => R.repeat(char, Math.floor(Math.random() * 5) + 1).join("")).join("");
		})()],
		hint1: "Use operators: = ! %",
		hint2: "Split string whenever there is a change in character",
		tests: [{
			description: testValue => <span><b>packSA</b>{`"${testValue}" equals ${ts.toString(pack(testValue))}`}</span>,
			condition: ({solution, testValue}) => JSON.stringify(solution(testValue)) === JSON.stringify(pack(testValue)),
		}],
	},
};