const {css} = Glamor;

const style = css({
    display: "flex",
    flexDirection: "row",
    backgroundColor: "var(--quotation)",
    color: "black",
    whiteSpace: "pre-wrap",
    padding: "1rem 2rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    fontStyle: "italic",
    "> .quote": {
        fontSize: "1.5rem",
        color: "var(--background)",
    },
    "> .text": {
        margin: "0 2rem",
    },
});

export default ({children}) => {
    return <p {...style}>
        <i className="quote fas fa-quote-left"></i>
        <div className="text">{children}</div>
    </p>;
};