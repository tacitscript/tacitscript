import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";
import ts from "common/src/tacitscript.js";

const {css} = Glamor;
const {useState, useEffect} = React;
const {ts2es6} = parser;

const style = css({
	position: "relative",
	width: "calc(85% + 2rem)",
	margin: "0 auto 1rem",
	backgroundColor: "var(--brown)",
	borderRadius: "0.25rem",
	display: "flex",
	flexDirection: "column",
	"> .heading": {
		padding: "0.5rem 1rem",
		fontSize: "1.2rem",
		display: "flex",
		fontWeight: "bold",
		":hover,:focus": {
			color: "var(--yellow)",
			cursor: "pointer",
		},
		"> .index": {
			width: "2rem",
		},
	},
	"> .status": {
		position: "absolute",
		color: "var(--background)",
		fontSize: "1.7rem",
		marginTop: "0.3rem",
		right: "1rem",
	},
	"> .contents": {
		"margin": "0 1rem 1rem",
		"> hr": {
			margin: "-1px 0 1rem",
		},
		"> h3": {
			fontSize: "1.25rem",
		},
		" .code-block": {
			display: "flex",
			flexDirection: "column",
			fontFamily: "Roboto Mono, monospace",
			backgroundColor: "var(--orange)",
			color: "#271c19",
			whiteSpace: "pre-wrap",
			padding: "0.5rem",
			borderRadius: "0.25rem",
			fontSize: "0.8rem",
			"> li": {
				marginLeft: "0.5rem",
			},
			" pre": {
				margin: "0 0 0.5rem",
			},
			".exercises": {
				backgroundColor: "var(--yellow)",
				padding: "1rem",
				"> .question": {
					marginBottom: "0.5rem",
				},
				"> .single-line": {
					margin: "1rem 0.3rem 0.2rem",
				},
				"> .test": {
					display: "flex",
					flex: "1 1 auto",
					alignItems: "flex-end",
					"> .status": {
						display: "flex",
						width: "1rem",
						color: "var(--icon-brown)",
						justifyContent: "center",
					},
					"> .description": {
						display: "flex",
						marginLeft: "0.5rem",
					},
				},
			},
		},	
	},
});

export default ({id, name, description, index, exercise: {question, getJs, tests, getHtml}, def, pass, dispatch}) => {
	const [open, setOpen] = useState(false);
	let solution;

	try {
		if (def) eval(ts2es6(getJs(def)).replace(/const /g, "var "));
	} catch (ex) {
		var i = 0;
	}

	const passes = tests.map(({condition}) => (def != undefined) && (solution != undefined) && condition({solution, def}));
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

	return <div className="lesson" {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="index">{`${index + 1}.`}</div>
			<div className="name">{name}</div>
		</div>
		{(pass == undefined) ? null : <i className={`status fas fa-${pass ? "check" : "times"}`}/>}
		{open ? <div className="contents">
			<hr/>
			{description}
			<h3>Exercise</h3>
			<div className="code-block exercises">
				<div className="question">{question}</div>
				{tests.map(({description}, index) => <div className="test" key={index}>
					<div className="status">{(def == undefined) ? <i className="icon">&bull;</i> : <i className={`icon fas fa-${passes[index] ? "check" : "times"}`}></i>}</div>
					<div className="description">{description}</div>
				</div>)}
				{getHtml(<TextEdit {...{id, defaultValue: def, dispatch}}/>)}
			</div>
		</div> : null}
	</div>;
};