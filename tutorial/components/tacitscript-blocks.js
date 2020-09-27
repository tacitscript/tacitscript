import tacitscriptBlocksExercise from "../data/tacitscript-blocks-exercise.js";
import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";
import getReconstructedHtml from "../logic/get-reconstructed-html.js";

const {ts2es6} = parser;
const {useSelector} = ReactRedux;
const {useEffect} = React;
const {expect} = chai;

export default ({}) => {
	const answer = useSelector(R.path(["app", "tacitscriptBlocks"]));
	let syntaxError = false;

	try {
		if (answer) eval(ts2es6(R.flatten(tacitscriptBlocksExercise(answer || "()")).join("\n")).replace(/const /g, "var "));
	} catch(ex) {
		syntaxError = true;
	}

	useEffect(() => {
		document.getElementById("tacitscript-blocks-exercise").innerHTML = "";

		setTimeout(() => {
			document.getElementById("tacitscript-blocks-exercise").innerHTML = "";

			describe("tacitscript-blocks-exercise", () => {
				const run = (!answer || syntaxError) ? xit : it;

				run('result is an array', () => expect(Array.isArray(numbers)).eql(true));
				run('result has more than one element', () => expect(numbers.length > 1).eql(true));
				run('all elements of result are numbers', () => expect(numbers.every(number => typeof(number) === "number")));
				run('sum of elements in result equals 38', () => expect(numbers.reduce((a, b) => a + b)).eql(38));
			});

			mocha.setup({
				grep: /^tacitscript-blocks-exercise/,
			});
			mocha.run(null, "tacitscript-blocks-exercise");},
		500);
	}, [answer]);

	return 	<div className="code-block exercises">
		<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 38.</li>
		{getReconstructedHtml(tacitscriptBlocksExercise(<TextEdit path={["tacitscriptBlocks"]}/>))}
		{syntaxError ? <div className="mocha"><h2 className="test fail">Syntax Error</h2></div> : null}
		<div id="tacitscript-blocks-exercise" className="mocha"></div>
	</div>;
};