const {expect} = chai;

import generators from "./generators.js";
import sicp from "./sicp.js";
import operators from "./operators.js";
import parser from "./parser.js";

mocha.setup('bdd');

generators();
sicp();
operators();
parser();

mocha.run();