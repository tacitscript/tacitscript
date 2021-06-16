import parser from "common/src/parser.js";
import ts from "common/src/tacitscript.js";

const {css} = Glamor;
const {useState, useEffect} = React;
const {ts2es6} = parser;

const style = css({
	color: "white",
	"> .heading": {
		userSelect: "none",
		color: "#ccc",
	},
});

export default React.memo(({id, name, description, epilogue, index, exercise: {question, getJs, tests, getHtml, getTestValue} = {}, def, dispatch}) => {
	const [open, setOpen] = useState(false);
	let solution;
	let es6 = "";

	try {
		if (def) {
			es6 = ts2es6(getJs(def));
			eval(es6.replace(/const /g, "var "));
		}
	} catch (ex) {
		var i = 0;
	}

	const testValue = getTestValue && getTestValue();
	const passes = tests ? tests.map(({condition}) => /*(def != undefined) && */solution && condition({solution, def, es6, testValue})) : [];
	const isPassed = def ? passes.every(pass => pass === true) : undefined;

	useEffect(() => {
		dispatch({
			type: "SOLUTION",
			payload: {
				id, 
				status: !def ? "empty" : isPassed ? "pass" : "fail",
			},
		});
	}, [isPassed]);

	return <div className={`panel${open ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="index">{`${index + 1}.`}</div>
			<div className="name">{name}</div>
		</div>
		{(isPassed == undefined) ? null : <i className={`status fas fa-${isPassed ? "check" : "times"}`}/>}
		{open ? <div className="contents">
			<hr/>
			{description}
			{question ? <React.Fragment>
				<h3>Exercise</h3>
				<div className="code-block exercises">
					<div className="question">{question}</div>
					{tests.map(({description}, index) => <div className="test" key={index}>
						<div className="status">{(def == undefined) ? <i className="icon">&bull;</i> : <i className={`icon fas fa-${passes[index] ? "check" : "times"}`}></i>}</div>
						<div className="description">{(typeof description === "function") ? description(testValue) : description}</div>
					</div>)}
					{getHtml({id, defaultValue: def, dispatch})}
				</div>
			</React.Fragment> : null}
			{epilogue}
		</div> : null}
	</div>;
}, (prev, curr) => {
	var i =0;
	return prev.def === curr.def;
});