const {css} = Glamor;

const style = css({
	display: "flex",
	width: "100%",
	alignItems: "baseline",
});

export default lines => R.addIndex(R.map)((line, index) => <div {...style} key={index}>{R.addIndex(R.map)((part, index) => _.isString(part) ? <pre className="part" key={index}>{part}</pre> : <div key={index}>{part}</div>, line)}</div>, lines);