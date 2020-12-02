import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const toCelsius = value => (value - 32) / 9 * 5;

export default {
	id: "g",
	name: "Vector Interrogation",
	description: <div>
		<p>Arrays and strings share many common operations, and are collectively termed <b>vectors</b>.</p>
		<p><a href="#length"># (length)</a> retrieves the length of a vector.</p>
		<div className="code-block">{`lengthArray\t#(5 6 7)\t\t\t\t\tequals 3\nlengthEArray\t#( )\t\t\t\t\t\tequals 0\n\nlengthString\t#"Hello, World"\t\t\t\t\tequals 12\nlengthEString\t#""\t\t\t\t\t\tequals 0`}</div>
		<p><a href="#first">[ (first)</a> retrieves the first element of a vector.</p>
		<div className="code-block">{`firstArray\t[(5 6 7)\t\t\t\t\tequals 5\nfirstEArray\t[( )\t\t\t\t\t\tundefined\n\nfirstString\t["Hello, World"\t\t\t\t\tequals "H"\nfirstEString\t[""\t\t\t\t\t\tundefined`}</div>
		<p><a href="#last">] (last)</a> retrieves the last element of a vector.</p>
		<div className="code-block">{`lastArray\t](5 6 7)\t\t\t\t\tequals 7\nlastEArray\t]( )\t\t\t\t\t\tundefined\n\nlastString\t]"Hello, World"\t\t\t\t\tequals "d"\nlastEString\t]""\t\t\t\t\t\tundefined`}</div>
		<p><a href="#at">' (at)</a> retrieves the element at a zero-based index of a vector.</p>
		<div className="code-block">{`elementArray\t1'(5 6 7)\t\t\t\t\tequals 6\nlastString\t1'"Hello, World"\t\t\t\tequals "e"`}</div>
	</div>,
};