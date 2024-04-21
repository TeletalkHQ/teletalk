/* eslint-disable no-var */
import loglevel from "loglevel";

import { Environments, StringMap } from "~/types";

declare global {
  var logger = loglevel;
  var ping = (_data: StringMap) => { };

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments { }
  }
}