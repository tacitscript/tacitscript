import TextEdit from "./text-edit.js";
import parser from "common/src/parser.js";

const {css} = Glamor;
const {useState, useEffect} = React;
const {useSelector, useDispatch} = ReactRedux;
const {ts2es6} = parser;

const style = css({
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
	"> .contents": {
		"margin": "0 1rem 1rem",
		"> hr": {
			borderColor: "var(--yellow)",
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

export default ({id, name, description, index, exercise: {question, getJs, tests, getHtml}}) => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const definition = useSelector(R.path(["definitions", id]));
	let solution;

	try {
		if (definition) eval(ts2es6(getJs(definition)).replace(/const /g, "var "));
	} catch (ex) {
		var i = 0;
	}

	const passes = tests.map(({condition}) => (solution != undefined) && condition({solution, definition}));
	const allPassed = passes.every(pass => pass === true);

	useEffect(() => {
		dispatch({
			type: "SOLVED",
			payload: {id, allPassed},
		});
	}, [allPassed]);

	return <div className="lesson" {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="index">{`${index + 1}.`}</div>
			<div className="name">{name}</div>
		</div>
		{open ? <div className="contents">
			<hr/>
			{description}
			<h3>Exercise</h3>
			<div className="code-block exercises">
				<div className="question">{question}</div>
				{tests.map(({description}, index) => <div className="test" key={index}>
					<div className="status">{(solution == undefined) ? <i className="icon">&bull;</i> : <i className={`icon fas fa-${passes[index] ? "check" : "times"}`}></i>}</div>
					<div className="description">{description}</div>
				</div>)}
				{getHtml(<TextEdit id={id}/>)}
			</div>
		</div> : null}
	</div>;
}