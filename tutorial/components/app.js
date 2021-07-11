import lessons from "../lessons/lessons.js";
import Lesson from "./lesson.js";
import Score from "./score.js";
import operators from "../operators/operators.js";
import Operator from "./operator.js";
import TypeSignatures from "./type-signatures.js";

const {css} = Glamor;

const style = css({
	color: "#ccc",
	" :focus-visible": {
		outline: "1px solid white",
	},
	marginBottom: "5rem",
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
	" .code": {
		fontFamily: "Roboto Mono, monospace",
		color: "var(--orange)",
		fontSize: "0.85rem",
	},
	"> .block": {
		" + .block": {marginTop: "1rem"},
		"> .panel": {
			position: "relative",
			width: "calc(85% + 2rem)",
			margin: "0 auto 1px",
			".open": {
				marginBottom: "1rem",
				":not(:first-child)": {
					marginTop: "1rem",
				},
			},
			backgroundColor: "var(--brown)",
			borderRadius: "0.25rem",
			display: "flex",
			flexDirection: "column",
			"> .heading": {
				padding: "0.5rem 1rem",
				fontSize: "1.1rem",
				display: "flex",
				fontWeight: "bold",
				":hover": {
					color: "white",
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
				width: "1.7rem",
				textAlign: "center",
				".fa-pen": {
					fontSize: "1.5rem",
				},
			},
			"> .contents": {
				"margin": "0 1rem 1rem",
				"> hr": {
					margin: "-1px 0 1rem",
				},
				"> h3": {
					fontSize: "1.1rem",
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
					".table-data": {
						padding: "0 0.5rem",
						borderSpacing: "0 0.5rem",
					},
					" .code": {
						fontWeight: "bold",
					},
					" .code, a": {
						color: "inherit",
					},
					" a:hover": {
						color: "var(--brown)",
					},
					":not(.exercises)": {
						lineHeight: "1.1rem",
						overflow: "hidden",
					},
					"> i": {
						display: "inline",
					},
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
						" .name-expression": {
							display: "flex",
							alignItems: "baseline",
							"> .name": {
								width: "7rem",
							},
						},
						" .rule": {
							borderBottom: "1px solid #999",
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
		},
	},
	" .section": {
		width: "85%",
		margin: "0 auto 1rem",
		backgroundColor: "var(--brown)",
		padding: "0.5rem 1rem",
		borderRadius: "0.25rem",
		"> p": {
			margin: "0.4rem 0",
			color: "white",
		},
		"> h4": {
			margin: "0.4rem 0 1rem",
			fontSize: "1.05rem",
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
				":hover": {
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
					":hover": {
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
		":hover": {
			color: "var(--orange)",
		},
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
	const {solutions} = store.getState().app;

	return <div {...style}>
		<h1>tacitscript</h1>

		<div className="preview">
			<div className="code">avg .(+$ #)./$</div>
		</div>

		<div className="section">
			<h4>tacitscript - a language optimized for pen and paper</h4>
			<p>tacitscript is a <a href="https://en.wikipedia.org/wiki/Function-level_programming" target="_blank">function-level</a> programming language. Algorithms are built from a set of mathematical operators.</p>
			<p>Jump straight into the interactive tutorial below! (The entire language syntax is covered in the first six sections.)</p>
		</div>

		<div className="section-title">
			<div className="name">Tutorial</div>
			<Score {...{solutions}}/>
		</div>

		<div className="block">{lessons.slice(0, 6).map((details, index) => <Lesson {...{...details, index, key: index, ...(solutions[details.id] || {}), dispatch: store.dispatch}}/>)}</div>

		<div className="block">{lessons.slice(6).map((details, index) => <Lesson {...{...details, index: index + 5, key: index, ...(solutions[details.id] || {}), dispatch: store.dispatch}}/>)}</div>

		<div className="section-title">
			<div className="name">Reference</div>
		</div>

		<div className="block">{operators.map(details => <Operator {...{...details, dispatch: store.dispatch, key: details.id}}/>)}</div>

		<div className="block"><TypeSignatures dispatch={store.dispatch}/></div>

	</div>;
};


