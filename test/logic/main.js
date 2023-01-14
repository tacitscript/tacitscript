const {expect} = chai;

// import operators from "./operators.js";
import parser from "./parser.js";

mocha.setup('bdd');

// operators();
parser();

mocha.run();