import updateSolution from "./update-solution.js";

const initialState = {
    tacitscriptBlocks: "",
    repl: "",
    solutions: (solutionsString => solutionsString ? JSON.parse(solutionsString) : {})(localStorage.getItem("tacitscript-tutorial")),
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SOLUTION": return updateSolution({state, action});
        default: ;
    }

    return state;
}