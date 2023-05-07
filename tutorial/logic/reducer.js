import updateSolution from "./update-solution.js";

const initialState = {
    tacitscriptBlocks: "",
    repl: "",
    solutions: (solutionsString => solutionsString ? JSON.parse(solutionsString) : {})(localStorage.getItem("tacitscript-tutorial")), // {a: {def: "10", passed: false}}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SOLUTION": return updateSolution({state, action});
        default: ;
    }

    return state;
}