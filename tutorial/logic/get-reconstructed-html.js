const {css} = Glamor;

const style = css({
    display: "flex",
    width: "100%",
    alignItems: "baseline",
});

export default parts => R.map(part => Array.isArray(part) ? <div {...style}>{part[0]}{part[1]}</div> : part, parts);