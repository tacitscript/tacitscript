
export default {
	id: "i",
	name: "Logic Operations",
	description: <div>
		<p>The <a href="#andValue">& (andValue)</a> operation returns the right argument if the left argument is not <i>false</i>. Otherwise, it returns <i>false</i>.</p>
		<div className="code-block"><span>check           ""&amp;1                                            equals 1 (0 and "" are both <i>truthy</i>)</span></div>
		<p><a href="#andPredicate">& (andPredicate)</a> checks that a value conforms to two conditions.</p>
		<div className="code-block"><span>doubleCheck     &gt;2&amp;(&lt;6)                                         doubleCheck7=()</span></div>
		<p><a href="#bar">bar (|)</a> is the only operator that may return a defined value should either of its arguments be <i>undefined</i>.</p>
		<p>The <a href="#orValue">| (orValue)</a> operation returns the left argument, unless it is <i>false</i> or <i>undefined</i>. In this case, it returns the right.</p>
		<div className="code-block">
			<span>falseOrTwo      ()|2                                            equals 2</span>
		</div>
		<p><a href="#orPredicate">| (orPredicate)</a> tests a value against the left condition; then on fail, tests against the right.</p>
		<div className="code-block">
			<span>positiveOrEven  &gt;0|(%2.=0)                                      positiveOrEven(_2) is <i>true</i></span>
		</div>
		<p><a href="#orComparator">| (orComparator)</a> applies an <i>or</i> operation between the results of two binary tests.</p>
		<div className="code-block">
			<span>lessOrEqual     &lt;|=                                             2lessOrEqual2 is <i>true</i></span>
		</div>
		<p><a href="#notValue">! (notValue)</a> returns <i>true</i> when passed <i>false</i>, or <i>false</i> otherwise.</p>
		<div className="code-block">
			<span>notZero         !0                                              is <i>false</i> (0 and "" are truthy)</span>
		</div>
		<p><a href="#notPredicate">! (notPredicate)</a> <i>not</i>s the result of an operation.</p>
		<div className="code-block">
			<span>notOdd         !(%2.=1)                                         notOdd0 is <i>true</i></span>
		</div>
		<p><a href="#notComparator">! (notComparator)</a> <i>not</i>s the result of a comparison.</p>
		<div className="code-block">
			<span>notLess        !&lt;                                               2notLess2 is <i>true</i></span>
		</div>

	</div>,
};