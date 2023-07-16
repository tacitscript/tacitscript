import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const dice = [4, 6, 8, 10, 12, 20];

export default {
	id: "floor-and-ceiling",
	name: "Floor and Ceiling",
	operations: <React.Fragment><a href="#floor">([) floor</a>, <a href="#ceiling">(]) ceiling</a></React.Fragment>,
	description: <div>
		<p>The <a href="#floor">([) floor</a> operation takes a number <b>n</b> and returns the largest integer no larger than <b>n</b>.</p>
		<p>The <a href="#ceiling">(]) ceiling</a> operation take a number <b>n</b> and returns the smallest integer no smaller than <b>n</b>.</p>
		<div className="code-block">{getOperationExamples([
			["[3.1=3"],
			["](_1.8)=(_1)"],
		])}</div>
	</div>,
};