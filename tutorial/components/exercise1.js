import test1 from "../data/test1.js";
import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";
import getReconstructedHtml from "../logic/get-reconstructed-html.js";

const {ts2es6} = parser;
const {useSelector} = ReactRedux;
const {useEffect} = React;
const {expect} = chai;

export default ({}) => {
	const answer = useSelector(R.path(["app", "lesson1", "numbers"]));
	let syntaxError = false;

	try {
		if (answer) eval(ts2es6(R.flatten(test1(answer || "()")).join("\n")).replace(/const /g, "var "));
	} catch(ex) {
		syntaxError = true;
	}

	useEffect(() => {
		document.getElementById("exercise-1-tests").innerHTML = "";

		setTimeout(() => {
			describe("Lesson 1 Exercise Tests", () => {
				const run = (!answer || syntaxError) ? xit : it;

				run('"numbers" is an array', () => expect(Array.isArray(numbers)).eql(true));
				run('"numbers" has more than one element', () => expect(numbers.length > 1).eql(true));
				run('all elements of "numbers" are numbers', () => expect(numbers.every(number => typeof(number) === "number")));
				run('sum of elements in "numbers" equals 20', () => expect(numbers.reduce((a, b) => a + b)).eql(20));
			});

			mocha.setup({
				grep: /^Lesson 1 Exercise Tests/,
			});
			mocha.run(null, "exercise-1-tests");},
		500);
	}, [answer]);

	return 	<div className="code-block exercises">
		<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 20.</li>
		{getReconstructedHtml(test1(<TextEdit path={["lesson1", "numbers"]}/>))}
		{syntaxError ? <div className="mocha"><h2 className="test fail">Syntax Error</h2></div> : null}
		<div id="exercise-1-tests" className="mocha"></div>
	</div>;
};