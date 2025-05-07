import parser from "common/src/parser.js";
import ts from "common/src/tacitscript.js";
import {push} from "common/lib/redux-first/actions.js";

const {css} = Glamor;
const {useState, useEffect} = React;
const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const style = css({
	color: "white",
	"> .heading": {
		userSelect: "none",
		color: "#ccc",
		justifyContent: "space-between",
		"> .left": {
			display: "flex",
		},
		"> .right": {
			marginRight: "0.3rem",
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
			"> .operations": {
				fontWeight: "normal",
				marginLeft: "1rem",
				whiteSpace: "nowrap",
			},
			"> .status": {
				width: "2rem",
				display: "flex",
				justifyContent: "flex-end",
			},
		},
		":hover > .right > .operations": {
			color: "#ccc",
		},
	},
});

export default ({id, name, operations, description, epilogue, index, exercise: {question, getJs, tests, getHtml, hint1, hint2, getTestValues} = {}, def, revealed, showHint1, showHint2, dispatch, solutions}) => {
	const [open, setOpen] = useState(false);
	const openByHash = (hash => hash && (id === hash.slice(1)))(location.hash);
	const isOpen = open || openByHash;

	const setIsOpen = value => {
		if (!value && openByHash) dispatch(push({
			hash: "",
		}));

		if (value !== open) setOpen(value);
	};

	let solution;
	let es6 = "";

	try {
		if (def) {
			es6 = ts2es6(getJs({def, solutions}));
			eval(es6.replace(/const /g, "var "));
		}
	} catch (ex) {
		console.log("exception", ex);
	}

	const testValues = getTestValues ? getTestValues() : [];
	const passes = tests ? tests.map(({condition}, index) => {
		try {
			return condition({solution, def, es6, testValue: testValues[index]});
		} catch (e) {
			return false;
		}
	}) : [];
	const isPassed = def ? passes.every(pass => pass === true) : undefined;

	useEffect(() => {
		if (isPassed) {
			dispatch({
				type: "SOLUTION",
				payload: {
					id,
					status: !def ? "empty" : isPassed ? "pass" : "fail",
				},
			});
		}
	}, [isPassed]);

	return <div id={id} className={`panel${isOpen ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setIsOpen(!isOpen)} onKeyDown={e => {if (e.key === "Enter") setIsOpen(!isOpen);}}>
			<div className="left">
				<div className="index">{`${index + 1}.`}</div>
				<div className="name">{name}</div>
			</div>
			<div className="right">
				{operations ? <div className="operations">{operations}</div> : null}
				<div className="status">{(isPassed == undefined) ? null : <i className={`fas fa-${isPassed ? "check" : "pen"}`}/>}</div>
			</div>
		</div>
		{isOpen ? <div className="contents">
			<hr/>
			{description}
			{question ? <React.Fragment>
				{description ? <h3>Exercise</h3> : null}
				<div className="code-block exercises">
					<div className="question">{question}</div>
					{tests.map(({description}, index) => <div className="test" key={index}>
						<div className="status">{(def == undefined) ? <i className="icon">&bull;</i> : <i className={`icon fas fa-${passes[index] ? "check" : "times"}`}></i>}</div>
						<div className="description">{(typeof description === "function") ? description(testValues[index], def) : description}</div>
					</div>)}
					{getHtml({id, defaultValue: def, dispatch, revealed, pass: isPassed, hint1, hint2, showHint1, showHint2, solution, solutions})}
				</div>
			</React.Fragment> : null}
			{(typeof epilogue === "function") ? (isPassed ? epilogue() : null) : epilogue}
		</div> : null}
	</div>;
};