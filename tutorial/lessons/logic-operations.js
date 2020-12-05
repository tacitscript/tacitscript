
export default {
	id: "i",
	name: "Logic Operations",
	description: <div>
		<p>The <a href="#andValue">& (andValue)</a> operation returns the right argument if the left argument is not false.</p>
		<div className="code-block"><span>check           ""&amp;1                                            equals 1 (0 and "" are both <i>truthy</i>)</span></div>
		<p>The <a href="#andPredicate">& (andPredicate)</a> operation checks that a value conforms to two conditions.</p>
		<div className="code-block"><span>doubleCheck     &gt;2&amp;(&lt;6)                                         doubleCheck7=()</span></div>
		<p><a href="#lessThan">&lt; (lessThan)</a> supports number comparison, and string comparison by <i>dictionary-order</i>.</p>
		<div className="code-block">
			<span>numberLess      2&lt;3                                             is <i>true</i></span>
			<span>stringLess      "cad"&lt;"bad"                                     is <i>false</i></span>
		</div>
		<p><a href="#greaterThan">&gt; (greaterThan)</a></p>
		<div className="code-block">
			<span>numberGreater   2&gt;3                                             is <i>false</i></span>
			<span>stringGreater   "cad"&gt;"bad"                                     is <i>true</i></span>
		</div>
	</div>,
};