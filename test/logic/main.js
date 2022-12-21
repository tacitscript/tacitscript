const {expect} = chai;

// import sicp from "./sicp.js";
import parser from "./parser.js";

mocha.setup('bdd');

parser();
// sicp();

mocha.run();