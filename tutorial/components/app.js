import React from "react";

const {css} = Glamor;

const style = css({

});

export default ({store}) => {
    const {} = store.getState().app;

    return <div {...style}>
        hello
    </div>;
};