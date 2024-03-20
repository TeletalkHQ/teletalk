import { LoggerBrowser } from "logger-browser";

import { Environments, StringMap } from "~/types";

declare global {
  var logger = new LoggerBrowser();
  var ping = (_data: StringMap) => { };

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments { }
  }
}