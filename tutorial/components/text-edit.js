const {InputBase} = MaterialUI;
const {css} = Glamor;


const style = css({
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    padding: "0 !important",
    color: "#271c19",
    " .MuiInputBase-input": {
        fontFamily: "Roboto Mono, monospace",
        fontSize: "0.8rem",
    },
});

export default ({}) => {

    return <InputBase {...style} inputProps={{spellCheck: false}} multiline/>;
};