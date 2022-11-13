const {InputBase} = MaterialUI;
const {css} = Glamor;
const {useRef, useState} = React;

const style = css({
	width: "100%",
	display: "flex",
	alignItems: "center",
	"> .show-answer": {
		right: "1rem",
		borderRadius: "50%",
		width: "1.3rem",
		minWidth: "1.3rem",
		height: "1.3rem",
		minHeight: "1.3rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "0.1rem",
		":hover,:focus-visible,.selected": {
			cursor: "pointer",
			backgroundColor: "rgba(0, 0, 0, 0.15)",
		},
	},
	"> .MuiInputBase-root": {
		width: "100%",
		borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
		".MuiInputBase-multiline": {
			padding: 0,
		},
	},
	" .MuiInputBase-input": {
		":not(.MuiInputBase-inputMultiline)": {padding: "0 0 2px"},
		fontFamily: "Roboto Mono, monospace",
		fontSize: "0.8rem",
		color: "black",
	},
});

const update = _.debounce(({dispatch, id, value, revealed, showHint1, showHint2}) => dispatch({
	type: "SOLUTION",
	payload: {id, value, revealed, showHint1, showHint2},
}), 300);

export default ({dispatch, id, multiline, defaultValue = "", solution, revealed, pass, showHint1, showHint2, hint1, hint2, children}) => {
	const element = useRef(null);
	const [editMode, setEditMode] = useState(false);

	return <span {...style}>
		<InputBase ref={element} disabled={revealed} defaultValue={defaultValue} inputProps={{spellCheck: false}} multiline={multiline} onChange={(event) => update({dispatch, id, value: event.target.value})}
			onFocus={event => {
				if (multiline && R.path(["nativeEvent", "relatedTarget"], event)) {
					const textarea = element.current.firstChild;

					textarea.selectionStart = 0;
					textarea.selectionEnd = textarea.value.length;
				}
			}}
			onKeyDown={event => {
			const textarea = element.current.firstChild;

			if (!editMode && (event.key === "Enter")) {
				if (multiline) event.preventDefault();
				
				setEditMode(true);

				textarea.selectionStart = textarea.selectionEnd = -1;
			} else if (editMode && (event.key === "Tab")) {
				event.preventDefault();

				if (event.shiftKey) {
					setEditMode(false);
					textarea.selectionStart = 0;
					textarea.selectionEnd = textarea.value.length;
				} else {
					const s = textarea.selectionStart;
					textarea.value = textarea.value.substring(0, textarea.selectionStart) + "\t" + textarea.value.substring(textarea.selectionEnd);
					textarea.selectionEnd = s + 1;

					update({dispatch, id, value: textarea.value});
				}
			} else if (!(["Shift", "Control", "Alt", "Tab"].includes(event.key))) {
				setEditMode(true);
			}
		}}/>
		{children}
		{(pass || !hint1) ? null : <div role="button" tabIndex="0" aria-label="Show Hint 1" onClick={() => {
			update({dispatch, id, showHint1: true});
		}} className={`show-answer${showHint1 ? " selected" : ""}`} title={showHint1 ? hint1 : "Show hint 1"}><div aria-hidden="true">1</div></div>}
		{(pass || !hint2) ? null : <div role="button" tabIndex="0" aria-label="Show Hint 2" onClick={() => {
			update({dispatch, id, showHint2: true});
		}}className={`show-answer${showHint2 ? " selected" : ""}`} title={showHint2 ? hint2 : "Show hint 2"}><div aria-hidden="true">2</div></div>}
		{pass ? null : <div role="button" tabIndex="0" aria-label="Show Answer" className="show-answer" title="Show a solution"><i className="fas fa-eye" aria-hidden="true" onClick={() => {
			element.current.firstChild.value = solution;
			update({dispatch, id, value: solution, revealed: true});
		}}/></div>}
	</span>;
};