import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const toCelsius = value => (value - 32) / 9 * 5;

export default {
	id: "k",
	name: "Math Operations",
	description: <div>
		<p>Comparison operators return a boolean.</p>
		<p><a href="#power">^ (power)</a> raises its left argument to the power of its right.</p>
		<div className="code-block"><span>square         ^2                                               square3=9</span></div>
		<p><a href="#modulo">% (modulo)</a> returns the remainer of dividing its left argument by its right. (The result will have the same sign as the left argument.)</p>
		<div className="code-block"><span>remainder      7%2                                              equals 1</span></div>
	</div>,
};