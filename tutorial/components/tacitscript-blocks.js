import tacitscriptBlocksExercise from "../data/tacitscript-blocks-exercise.js";
import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";
import getReconstructedHtml from "../logic/get-reconstructed-html.js";

const {ts2es6} = parser;
const {useSelector} = ReactRedux;
const {useEffect} = React;
const {expect} = chai;
const {css} = Glamor;

const style = css({
	marginLeft: "1rem",
});

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

				run('result is an array', () => expect(Array.isArray(result)).eql(true));
				run('result has more than one element', () => expect(result.length > 1).eql(true));
				run('all elements of result are numbers', () => expect(result.every(number => typeof(number) === "number")));
				run('sum of elements in result equals 38', () => expect(result.reduce((a, b) => a + b)).eql(10));
			});

			mocha.setup({
				grep: /^tacitscript-blocks-exercise/,
			});
			mocha.run(null, "tacitscript-blocks-exercise");},
		500);
	}, [answer]);

	return 	<div className="code-block exercises">
		<li>Define an array <b>result</b> that contains multiple numbers, and only numbers, that add up to 10.</li>
		<div {...style}>{getReconstructedHtml(tacitscriptBlocksExercise(<TextEdit path={["tacitscriptBlocks"]}/>))}</div>
		{syntaxError ? <div className="mocha"><h2 className="test fail">Syntax Error</h2></div> : null}
		<div id="tacitscript-blocks-exercise" className="mocha"></div>
	</div>;
};