import TextEdit from "../components/text-edit.js";
import Table from "../components/table.js";
import ts from "tacitscript";

const cmToFeetAndInches = R.pipe(R.divide(R.__, 2.54), inches => inches / 12, ft => [Math.floor(ft), Math.round((ft % 1) * 12)], R.join("'"));

export default {
	id: "rounding",
	name: "Rounding",
	operations: <React.Fragment><a href="#round">(') round</a></React.Fragment>,
	description: <div>
		<p>The <a href="#round">(') round</a> operation takes an integer <b>i</b> and number <b>n</b>, and rounds <b>n</b> to <b>i</b> decimal places.</p>
		<div className="code-block">3'(5/3)=1.667</div>
	</div>,
	exercise: {
		question: <div>
			<div>Using the operator <b>cmToInchesNN</b>, define the operator <b>cmToFeetAndInchesNA</b> that converts a length in cm, to feet and inches (rounded to nearest whole number), in conventional notation:</div>
		</div>,
		getJs: ({def}) => `/*ts
cmToInchesNN			/2.54
solution				${def}
*/`,
		getHtml: details => <div><br/><div className="rule"/><br/><Table className="multiple-line">{[
			[<div className="name">cmToInchesNN</div>,<div className="expression">/2.54</div> ],
			[<div className="name">cmToFeetAndInchesNA</div>, <TextEdit {...{...details, solution: `cmToInchesNN./12.([ %1.*12.(0'))."'"$`}}/>],
		]}</Table></div>,
		getTestValues: () => [Math.floor(165 + (Math.random() * (188 - 165)))],
		hint1: "Use operators: * / . % [ ' cmToInchesNN",
		hint2: "convert to inches, divide by 12 then (floor for feet, get decimal, times 12 and round to integer for inches)",
		tests: [
			{description: testValue => <span><b>cmToFeetAndInchesNA</b>{`${testValue} equals ${ts.toString(cmToFeetAndInches(testValue))}`}</span>, condition: ({solution, testValue}) => JSON.stringify(cmToFeetAndInches(testValue)) === JSON.stringify(solution(testValue))},
			{description: <span><b>cmToFeetAndInchesNA</b> uses <b>cmToInchesNN</b></span>, condition: ({es6}) => es6.includes("cmToInchesNN")},
		],
	},
};