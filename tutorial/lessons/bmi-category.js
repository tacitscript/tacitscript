import TextEdit from "../components/text-edit.js";

const bmiCategory = bmi => {
	if (bmi < 18.5) return "underweight";
	if (bmi < 25) return "normal";
	if (bmi < 30) return "overweight";

	return "obese";
};

export default {
	id: "bmi-category",
	name: "Constant operators",
	operations: <React.Fragment><a href="#constant">(`) constant</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Given a person's <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank">body mass index (BMI)</a> define the operator <b>bmiCategoryNS</b> that returns the appropriate BMI category according to the following classification:</div>
			<ul>
				<li><span className="code">"underweight"</span> for <span className="code">bmi &lt; 18.5</span></li>
				<li><span className="code">"normal"</span> for <span className="code">18.5 &le; bmi &lt; 25</span></li>
				<li><span className="code">"overweight"</span> for <span className="code">25 &le; bmi &lt; 30</span></li>
				<li><span className="code">"obese"</span> for <span className="code">bmi &ge; 30</span></li>
			</ul>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">bmiCategoryNS</div>
			<TextEdit {...{...details, multiline: true, solution: '((<18.5 "underweight"`) (<25 "normal"`) (<30 "overweight"`) "obese"`)?'}}/>
		</div>,
		getTestValues: () => R.pipe(
			R.times(Math.random),
			([a, b, c, d]) => [a * 8.5 + 10, b * 6.5 + 18.5, c * 5 + 25, d * 5 + 30],
			R.sortBy(Math.random),
		)(4),
		hint1: "Use operators: < ` ?",
		hint2: "use cond with increasing category conditions",
		tests: R.times(() => ({description: testValue => <span><b>bmiCategoryNS</b>{`${testValue.toFixed(1)} equals "${bmiCategory(testValue)}"`}</span>, condition: ({solution, testValue}) => bmiCategory(testValue) === solution(testValue)}), 4),
	},
};