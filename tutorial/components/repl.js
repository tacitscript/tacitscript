import replExercise from "../data/repl-exercise.js";
import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";
import getReconstructedHtml from "../logic/get-reconstructed-html.js";

const {ts2es6} = parser;
const {useSelector} = ReactRedux;
const {useEffect} = React;
const {expect} = chai;

export default ({}) => {
	const answer = useSelector(R.path(["app", "repl"]));
	let syntaxError = false;

	try {
		if (answer) eval(ts2es6(R.flatten(replExercise(answer)).join("\n")).replace(/const /g, "var "));
	} catch(ex) {
		syntaxError = true;
	}

	const className = syntaxError ? "fail" : window.result ? "pass" : "pass pending";

	return 	<div className="code-block exercises">
		{getReconstructedHtml(replExercise(<TextEdit path={["repl"]}/>))}
		<div className="mocha"><h2 className={`test ${className}`}>{syntaxError ? "Syntax Error" : `result: ${window.result && JSON.stringify(window.result)}`}</h2></div>
	</div>;
};