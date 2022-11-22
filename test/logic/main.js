const {expect} = chai;
import ts from "tacitscript";
import problems from "./problems.js";
import lodash from "./lodash.js";
import miscellaneous from "./miscellaneous.js";
import operators from "./operators.js";
import rosettaCode from "./rosetta-code.js";
import underscore from "./underscore.js";
import haskell from "./haskell.js";

mocha.setup('bdd');

haskell();
rosettaCode();
problems();
underscore();
lodash();
operators();
miscellaneous();

mocha.run();