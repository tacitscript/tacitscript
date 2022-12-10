const {expect} = chai;

import sicp from "./sicp.js";

mocha.setup('bdd');

sicp();

mocha.run();