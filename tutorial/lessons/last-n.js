import TextEdit from "../components/text-edit.js";

const last = (n, a) => R.pipe(R.splitAt(-n), R.last)(a);

export default {
	id: "last-n",
	name: "Last N",
	exercise: {
		question: <div>
			<div>Define the binary operator <b>lastnNAA</b> that takes an integer <b>n</b> and array <b>a</b>, and returns the last <b>n</b> elements of <b>a</b>:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">lastnNAA</div>
			<TextEdit {...{...details, multiline: true, solution: `:,(_ ;).%$.]`}}/>
		</div>,
		getTestValues: () => [[Math.floor(Math.random() * 11), R.times(() => Math.floor(Math.random() * 10), 10)]],
		hint1: "Use operators: , _ . $ ; % ] :",
		hint2: "negate number, split array at that index, the take right half",
		tests: [
			{description: ([n, a]) => <span>{n}<b>lastnNAA</b>{`${ts.toString(a)} equals ${ts.toString(last(n, a))}`}</span>, condition: ({solution, testValue: [n, a]}) => JSON.stringify(last(n, a)) === JSON.stringify(solution(n, a))},
		],
	},
};