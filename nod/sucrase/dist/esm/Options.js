import {createCheckers} from "ts-interface-checker";

import OptionsGenTypes from "./Options-gen-types";

const {Options: OptionsChecker} = createCheckers(OptionsGenTypes);


















































export function validateOptions(options) {
  OptionsChecker.strictCheck(options);
}
