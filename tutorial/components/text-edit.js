const {InputBase} = MaterialUI;
const {css} = Glamor;
const {useRef, useState} = React;

const style = css({
	width: "100%",
	display: "flex",
	"> .show-answer": {
		right: "1rem",
		borderRadius: "50%",
		width: "1.3rem",
		height: "1.3rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "0.1rem",
		":hover,:focus-visible": {
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

const update = _.debounce(({dispatch, id, value, reveal}) => dispatch({
	type: "SOLUTION",
	payload: {id, value, reveal},
}), 300);

export default ({dispatch, id, multiline, defaultValue = "", solution}) => {
	const element = useRef(null);
	const [editMode, setEditMode] = useState(false);

	return <span {...style}>
		<InputBase ref={element} defaultValue={defaultValue} inputProps={{spellCheck: false}} multiline={multiline} onChange={(event) => update({dispatch, id, value: event.target.value})}
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
		<div role="button" tabindex="0" aria-label="Show Answer" className="show-answer" title="Show a solution"><i className="fas fa-eye" aria-hidden="true" onClick={() => {
			update({dispatch, id, value: solution, reveal: true});
		}}/></div>
	</span>;
};