/* eslint-disable no-var */
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

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.module.sass";
