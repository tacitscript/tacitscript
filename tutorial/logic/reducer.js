
const initialState = {
    lesson1: {
        numbers: "",
    },
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "ANSWER": return R.set(R.lensPath(action.payload.path), action.payload.value, state);
        default: ;
    }

    return state;
}