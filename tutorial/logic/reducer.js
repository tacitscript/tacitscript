
const initialState = {
    tacitscriptBlocks: "",
    repl: "",
    definitions: {},
    solved: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "ANSWER": return R.set(R.lensPath(["definitions", action.payload.id]), action.payload.value, state);
        default: ;
    }

    return state;
}