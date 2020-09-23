const {InputBase} = MaterialUI;
const {css} = Glamor;


const style = css({
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    padding: "0 !important",
});

export default ({}) => {

    return <InputBase {...style} multiline/>;
};