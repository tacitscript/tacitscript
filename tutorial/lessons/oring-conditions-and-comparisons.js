import TextEdit from "../components/text-edit.js";

const strings = ["Mr. Owl ate my metal worm", "Do geese see God?", "Sir, I demand, I am a maid named Iris", "A man, a plan, a canal -- Panama!", "Evil snack cans live?", "Ma, I'm all llama, I am", "Never ever, Eve, even?", "Enda; at last, a 'good' Edna"];
const filterPunctuation = R.pipe(R.split(""), R.filter(x => (x >= "a" && x <= "z") | (x >= "A" && x <= "Z")), R.join(""));

export default {
	id: "oring-conditions-and-comparisons",
	name: "ORing Conditions and Comparisons",
	operations: <React.Fragment><a href="#orCondition">(|) orCondition</a>, <a href="#orComparison">(|) orComparison</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>During the development of our <a href="#palindrome-checker">palindrome checker</a>, we filtered punctuation from a lower-case string by comparison against a <i>whitelist</i> of characters.</div>
			<p>Let's rewrite this filtering, without converting to lower-case or using a character whitelist. We can use logic operations and string comparisons to check that characters are within a defined upper-case or lower-case range.</p>
			<p>Define <b>filterPunctuationSS</b> such that:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">filterPunctuationSS</div>
			<TextEdit {...{...details, multiline: true, solution: '""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))?.""$'}}/>
		</div>,
		hint1: "Use operators: = . $ < > | & ?",
		hint2: 'Split to characters, filter if between a and z, or A and Z, re-join',
		getTestValues: () => [
			strings[Math.floor(Math.random() * strings.length)],
		],
		tests: [
			{description: testValue => <span><b>filterPunctuationSS</b>{`"${testValue}" equals "${filterPunctuation(testValue)}"`}</span>, condition: ({solution, testValue}) => filterPunctuation(testValue) === solution(testValue)},
			{description: <span><b>filterPunctuationSS</b> does <i>not</i> use <a href="#atsign">atsign (@)</a></span>, condition: ({es6}) => !es6.includes("ts.atsign")},
		],
	},
};