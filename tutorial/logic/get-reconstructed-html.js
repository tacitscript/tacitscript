const {css} = Glamor;

const style = css({
	display: "flex",
	width: "100%",
	alignItems: "baseline",
});

export default lines => R.map(line => <div {...style}>{R.map(part => _.isString(part) ? <pre>{part}</pre> : part, line)}</div>, lines);