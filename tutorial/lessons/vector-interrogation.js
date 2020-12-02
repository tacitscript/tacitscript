import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const toCelsius = value => (value - 32) / 9 * 5;

export default {
	id: "g",
	name: "Vector Interrogation",
	description: <div>
		<p>Arrays and strings share many common operations, and are collectively termed <b>vectors</b>.</p>
		<p><a href="#length"># (length)</a> retrieves the length of the vector.</p>
		<div className="code-block">{`lengthArray\t[(5 6 7)\t\t\t\t\tequals 3\nlengthString\t["\t\t\t\t\tequals 3`}</div>
		<p>The <a href="#dot">dot (.)</a> and <a href="#comma">comma (,)</a> operators have lowest precedence, so parentheses are not required around <span className="code">+1</span> above.</p>
		<p>The related <a href="#binary-unary-pipe">. (binaryUnaryPipe)</a> operation takes a binary operator on the left.</p>
		<div className="code-block">{`average\t\t+./2\ncalculation\t5average7\t\t\t\t\tequals 6`}</div>
	</div>,
};