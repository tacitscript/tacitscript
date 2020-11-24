const {InputBase} = MaterialUI;
const {css} = Glamor;
const {useRef, useState} = React;

const style = css({
	width: "100%",
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

const update = _.debounce(({dispatch, id, value}) => dispatch({
	type: "SOLUTION",
	payload: {id, value},
}), 300);

export default ({dispatch, id, multiline, defaultValue = ""}) => {
	const element = useRef(null);
	const [editMode, setEditMode] = useState(false);

	return <span {...style} onKeyDown={event => {event.stopPropagation(); (event.key === "Enter") ? setEditMode(true) : null;}}>
		<InputBase ref={element} defaultValue={defaultValue} inputProps={{spellCheck: false}} multiline={multiline} onChange={(event) => update({dispatch, id, value: event.target.value})}
			onKeyDown={event => {
			const textarea = element.current.firstChild;

			if (!editMode && (event.key === "Enter")) {
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
	</span>;
};