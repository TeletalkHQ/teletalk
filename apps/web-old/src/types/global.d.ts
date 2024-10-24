/* eslint-disable no-var */

import { Environments, StringMap } from "~/types";

declare global {
  var ping = (_data: StringMap) => {};

  namespace NodeJS {
    interface ProcessEnv extends Environments {}
  }
}