import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const toCelsius = value => (value - 32) / 9 * 5;

export default {
	id: "g",
	name: "Vector Interrogation",
	description: <div>
		<p>Arrays and strings share many common operations, and are collectively termed <b>vectors</b>.</p>
		<p><a href="#length"># (length)</a> retrieves the length of a vector.</p>
		<div className="code-block">{`lengthArray\t#(5 6 7)\t\t\t\t\tequals 3\nlengthEArray\t#( )\t\t\t\t\t\tequals 0\n\nlengthString\t#"Hello, World!"\t\t\t\tequals 13\nlengthEString\t#""\t\t\t\t\t\tequals 0`}</div>
		<p><a href="#first">[ (first)</a> retrieves the first element of a vector.</p>
		<div className="code-block">
			<span>{`firstArray\t[(5 6 7)\t\t\t\t\tequals 5\nfirstEArray\t[( )\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`\nfirstString\t["Hello, World!"\t\t\t\tequals "H"\nfirstEString\t[""\t\t\t\t\t\t`}
			<i>undefined</i></span>
		</div>
		<p><a href="#last">] (last)</a> retrieves the last element of a vector.</p>
		<div className="code-block">
			<span>{`lastArray\t](5 6 7)\t\t\t\t\tequals 7\nlastEArray\t]( )\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`\nlastString\t]"Hello, World!"\t\t\t\tequals "!"\nlastEString\t]""\t\t\t\t\t\t`}
			<i>undefined</i></span>
		</div>
		<p><a href="#at">' (at)</a> retrieves the element at a zero-based index of a vector. Negative indices count back from the end of the vector.</p>
		<div className="code-block">
			<span>{`elemArray\t1'(5 6 7)\t\t\t\t\tequals 6\nelemEArray\t0'( )\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemOOBArray\t3'(5 6 7)\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemNegArray\t_1'(5 6 7)\t\t\t\t\tequals 7\n\n\elemString\t1'"Hello, World!"\t\t\t\tequals "e"\nelemEString\t0'""\t\t\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemOOBString\t13'"Hello, World!\t\t\t\t`}
			<i>undefined</i></span>
			<span>{`elemNegString\t_1'"Hello, World!"\t\t\t\tequals "!"`}</span>
		</div>
	</div>,
};