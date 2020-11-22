const {InputBase} = MaterialUI;
const {css} = Glamor;

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
	return <span {...style}><InputBase defaultValue={defaultValue} inputProps={{spellCheck: false}} multiline={multiline} onChange={(event) => update({dispatch, id, value: event.target.value})}/></span>;
};