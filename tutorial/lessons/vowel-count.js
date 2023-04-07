import TextEdit from "../components/text-edit.js";

const vowelCount = R.pipe(R.split(""), R.filter(R.includes(R.__, "AEIOUaeiou")), R.length);

const quotations = [
	"The best way to find out if you can trust somebody is to trust them.",
	"Your time is limited, don't waste it living someone else's life.",
	"Blessed are the hearts that can bend; they shall never be broken.",
	"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
	"Happiness can exist only in acceptance.",
];

export default {
	id: "vowel-count",
	name: "Vowel Count",
	operations: <React.Fragment><a href="#indicesOf">(@) indicesOf</a>, <a href="#chunkByDelimiter">(%) chunkByDelimiter</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>vowelCountSN</b> that takes a string and returns the number of contained vowels.</div>
			<p>Note that sometimes <b>y</b> is treated as a vowel, but it is not considered a vowel for the purposes of this problem.</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div><br/><div className="rule"/><br/><div className="single-line name-expression">
			<div className="name">vowelCountSN</div>
			<TextEdit {...{...details, multiline: true, solution: `""%.@"AEIOUaeiou"?.#`}}/>
		</div></div>,
		getTestValues: () => R.pipe(R.sortBy(Math.random), R.take(2))(quotations),
		hint1: "Use operators: . # @ ? %",
		hint2: "Split to characters, filter if find a vowel, then check length",
		tests: R.times(() => ({description: testValue => <span><b>vowelCountSN</b>{`"${testValue}" equals ${vowelCount(testValue)}`}</span>, condition: ({solution, testValue}) => vowelCount(testValue) === solution(testValue)}), 2),
	},
};