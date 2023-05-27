const {expect} = chai;

// import generators from "./generators.js";
// import sicp from "./sicp.js";
// import operators from "./operators.js";
// import parser from "./parser.js";
// import problems from "./problems.js";
import temp from "./temp.js";

mocha.setup('bdd');

// generators();
// sicp();
// operators();
// parser();
// problems();
temp();

mocha.run();