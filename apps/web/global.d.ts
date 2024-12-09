/* eslint-disable no-var */

import type { Environments, StringMap } from "~/types";

declare global {
  var ping = (_data: StringMap) => {};

  namespace NodeJS {
    interface ProcessEnv extends Environments {}
  }
}