import test1 from "../data/test1.js";
import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";

const {ts2es6} = parser;
const {useSelector} = ReactRedux;
const {useEffect} = React;

export default ({}) => {
	const answer = useSelector(R.path(["app", "lesson1", "numbers"]));

	useEffect(() => {
		describe("Lesson 1 Exercise Tests", () => {
			eval(ts2es6(test1(answer || "()")).replace(/const /g, "var "));

			it('"numbers" is an array', () => expect(Array.isArray(numbers)).eql(true));
			it('"numbers" has more than one element', () => expect(numbers.length > 1).eql(true));
			it('all elements of "numbers" are numbers', () => expect(numbers.every(number => typeof(number) === "number")));
			it('sum of elements in "numbers" equals 20', () => expect(numbers.reduce((a, b) => a + b)).eql(20));
		});

		mocha.setup({
			grep: /^Lesson 1 Exercise Tests/,
		});
		mocha.run(null, "exercise-1-tests");
	}, [answer]);

	return 	<div className="code-block exercises">
		<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 20.</li>
		<div dangerouslySetInnerHTML={{__html: test1(<TextEdit/>)}}/>
		<div id="exercise-1-tests" className="mocha"></div>
	</div>;
};