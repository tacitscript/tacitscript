import lessons from "../lessons/lessons.js";
import Lesson from "./lesson.js";
import Score from "./score.js";

const {css} = Glamor;

const style = css({
	" :focus": {
		outline: "1px solid white",
	},
	"> h1": {
		color: "#fffffe",
		fontSize: "3rem",
		fontWeight: 700,
		lineHeight: 1.3,
		textAlign: "center",
		marginBottom: 0,
	},
	"> .section-title": {
		display: "flex",
		justifyContent: "space-between",
		width: "85%",
		margin: "1.5rem auto 0.75rem",
		fontSize: "1.5rem",
		fontWeight: "bold",
	},
	" .section": {
		width: "85%",
		margin: "0 auto 1rem",
		backgroundColor: "var(--brown)",
		padding: "0.5rem 1rem",
		borderRadius: "0.25rem",
		"> p": {
			margin: "0.4rem 0",
		},
		"> h4": {
			margin: "0.4rem 0 0.7rem",
		},
		"> h2": {
			margin: "0.5rem 0",
			fontSize: "1.2rem",
			" .operator": {
				fontSize: "1.3rem",
				fontFamily: "Roboto Mono, monospace",
			},
		},
		"> h3": {marginTop: "2.5rem", fontSize: "1.25rem"},
		"> hr": {marginBottom: "1.5rem"},
		"> ul": {paddingInlineStart: "2rem"},
		".contents": {
			backgroundColor: "var(--background)",
			"> hr": {
				borderColor: "var(--yellow)",
				marginBottom: "1rem",
			},
			"> h4": {
				margin: "1rem 0",
				fontSize: "1rem",
			},
			" a": {
				color: "var(--text-color)",
				":hover,:focus": {
					color: "var(--yellow)",
				},
			},
			"> .listings": {
				display: "flex",
				flexWrap: "wrap",
				marginBottom: "1.5rem",
				"> a": {
					lineHeight: "1.3rem",
					backgroundColor: "#1a110e",
					border: "3px solid var(--background)",
					borderRadius: "6px",
					":hover,:focus": {
						color: "var(--text-color)",
						backgroundColor: "var(--brown)"
					},
					".lesson": {
						width: "14.35rem",
						padding: "2px 5px",
					},
					".operator": {
						width: "15rem",
						fontSize: "1.1rem",
						fontFamily: "Roboto Mono, monospace",
						display: "flex",
						flex: "0 1 auto",
						lineHeight: "1.5rem",
						"> .symbol": {
							display: "flex",
							flex: "1 1 auto",
							justifyContent: "center",
						},
						"> .type": {
							display: "flex",
							justifyContent: "center",
							width: "1.5rem",
							backgroundColor: "var(--brown)",
							flex: "0 0 auto",
							color: "var(--background)",
							fontWeight: "bold",
							borderBottomRightRadius: 3,
							borderTopRightRadius: 3,
							borderLeft: "1px solid #1a110e",
						}
					},
				},
			},
		},
	},
	" a": {
		color: "var(--yellow)",
		textDecoration: "none",
		":hover,:focus": {
			color: "var(--orange)",
		},
	},
	" .code": {
		fontFamily: "Roboto Mono, monospace",
		color: "var(--orange)",
		fontSize: "0.85rem",
	},
	"> .preview": {
		whiteSpace: "pre-wrap",
		display: "flex",
		flex: "1 1 auto",
		alignItems: "center",
		flexDirection: "column",
		margin: "1rem 0 1.5rem",
		"> .code": {
			fontSize: "1.1rem",
		},
	},
});

export default ({store}) => {
	const {solutions} = store.getState();

	return <div {...style}>
		<h1>tacitscript</h1>

		<div className="preview">
			<div className="code">avg .(+$ #)./$</div>
		</div>

		<div className="section">
			<h4>tacitscript - a language for building algorithms</h4>
			<p>tacitscript is a <a href="https://en.wikipedia.org/wiki/Function-level_programming" target="_blank">function-level</a> programming language. Jump straight into the interactive tutorial below!</p>
		</div>

		<div className="section-title">
			<div className="name">Tutorial</div>
			<Score {...{solutions}}/>
		</div>

		<div className="lessons">{lessons.map((details, index) => <Lesson {...{...details, index, key: index, ...(solutions[details.id] || {}), dispatch: store.dispatch}}/>)}</div>
	</div>;
};


