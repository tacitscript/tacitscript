const {expect} = chai;

import parser from "./parser.js";

mocha.setup('bdd');

parser();

mocha.run();