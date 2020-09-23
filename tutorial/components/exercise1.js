import exercise1 from "../data/exercise1.js";
import TextEdit from "./text-edit.js";

const {useSelector} = ReactRedux;
const {useEffect} = React;

export default ({}) => {
	const lesson1 = useSelector(R.path(["lesson1"]));

	useEffect(() => {
		mocha.setup({
			grep: /^Lesson 1 Exercise Tests/,
		});
		mocha.run(null, "exercise-1-tests");
	}, [lesson1]);

	return 	<div className="code-block exercises">
		<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 20.</li>
		<TextEdit/>
		<div dangerouslySetInnerHTML={{__html: exercise1}}/>
		<div id="exercise-1-tests" className="mocha"></div>
	</div>;
};