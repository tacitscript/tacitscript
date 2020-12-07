
export default {
	id: "i",
	name: "Logic Operations",
	description: <div>
		<p>The <a href="#andValue">& (andValue)</a> operation returns the right argument if the left argument is not <i>false</i>. Otherwise, it returns <i>false</i>.</p>
		<div className="code-block"><span>check           ""&amp;1                                            equals 1 (0 and "" are both <i>truthy</i>)</span></div>
		<p>The <a href="#andPredicate">& (andPredicate)</a> operation checks that a value conforms to two conditions.</p>
		<div className="code-block"><span>doubleCheck     &gt;2&amp;(&lt;6)                                         doubleCheck7=()</span></div>
		<p><a href="#bar">bar (|)</a> is the only operator that may return a defined value should either of its arguments be <i>undefined</i>.</p>
		<p>The <a href="#orValue">| (orValue)</a> operation returns the left argument, unless it is <i>false</i> or <i>undefined</i>. In this case, it returns the right.</p>
		<div className="code-block">
			<span>falseOrTwo      ()|2                                            equals 2</span>
		</div>
		<p>The <a href="#orPredicate">| (orPredicate)</a> tests a value against the left condition; then on fail, tests against the right.</p>
		<div className="code-block">
			<span>positiveOrEven  &gt;0|(%2.=0)                                      positiveOrEven(_2) is <i>true</i></span>
		</div>
	</div>,
};