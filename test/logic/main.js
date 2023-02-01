const {expect} = chai;

// import sicp from "./sicp.js";
import operators from "./operators.js";
import parser from "./parser.js";

mocha.setup('bdd');

// sicp();
operators();
parser();

mocha.run();