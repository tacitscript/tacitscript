import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

const toCelsius = value => (value - 32) / 9 * 5;

export default {
	id: "h",
	name: "Comparisons",
	description: <div>
		<p>Comparison operators return a boolean.</p>
		<p><a href="#equals">= (equals)</a> makes a deep <i>by-value</i> comparison.</p>
		<div className="code-block"><span>deepCheck       ("abc" (1 2 3))=("abc" (1 2 4))                 is <i>false</i></span></div>
		<p><a href="#less-than">&lt; (lessThan)</a> supports number comparison, and string comparison by <i>dictionary-order</i>.</p>
		<div className="code-block">
			<span>numberLess      2&lt;3                                             is <i>true</i></span>
			<span>stringLess      "cad"&lt;"bad"                                     is <i>false</i></span>
		</div>
		<p><a href="#greater-than">&gt; (greaterThan)</a></p>
		<div className="code-block">
			<span>numberGreater   2&gt;3                                             is <i>false</i></span>
			<span>stringGreater   "cad"&gt;"bad"                                     is <i>true</i></span>
		</div>
	</div>,
};