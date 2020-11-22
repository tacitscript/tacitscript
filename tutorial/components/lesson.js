import TextEdit from "./text-edit.js";

const {css} = Glamor;
const {useState} = React;
const {useSelector} = ReactRedux;

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
			color: "black",
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
					margin: "1rem 0.5rem",
				},
				"> .test": {
					display: "flex",
					flex: "1 1 auto",
					"> .status": {
						width: "0.5rem",
					},
				},
			},
		},	
	},
});

export default ({id, name, description, index, exercise: {question, conditions, getJs, tests, getHtml}}) => {
	const [open, setOpen] = useState(false);
	const solution = useSelector(R.path(["app", id]));

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
				{conditions ? conditions.map((condition, index) => <li key={index}>{condition}</li>) : null}
				{getHtml(<TextEdit path={[id]}/>)}
				{tests.map(({description, condition}, index) => <div className="test">
					<div className="status"></div>
					<div className="description">{description}</div>
				</div>)}
			</div>
		</div> : null}
	</div>;
}