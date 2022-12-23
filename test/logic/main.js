const {expect} = chai;

// import sicp from "./sicp.js";
import parser from "./parser.js";
import operators from "./operators.js";

mocha.setup('bdd');

operators();
parser();
// sicp();

mocha.run();