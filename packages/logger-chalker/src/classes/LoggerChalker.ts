import { customTypeof } from "@repo/custom-typeof";
import { Logestige } from "@repo/logestige";
import chalk from "chalk";

import { LogItem } from "../types";

declare type ForegroundColor =
	| "black"
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "gray"
	| "grey"
	| "blackBright"
	| "redBright"
	| "greenBright"
	| "yellowBright"
	| "blueBright"
	| "magentaBright"
	| "cyanBright"
	| "whiteBright";

declare type BackgroundColor =
	| "bgBlack"
	| "bgRed"
	| "bgGreen"
	| "bgYellow"
	| "bgBlue"
	| "bgMagenta"
	| "bgCyan"
	| "bgWhite"
	| "bgGray"
	| "bgGrey"
	| "bgBlackBright"
	| "bgRedBright"
	| "bgGreenBright"
	| "bgYellowBright"
	| "bgBlueBright"
	| "bgMagentaBright"
	| "bgCyanBright"
	| "bgWhiteBright";

export class LoggerChalker extends Logestige {
	colorizer = chalk;

	constructor() {
		super();
	}

	private foregroundMaker(colorKey: ForegroundColor) {
		return (...data: LogItem[]) => {
			data.forEach((value) => {
				if (customTypeof.isObjectNative(value)) {
					this.logs.push(value);
				} else {
					this.logs.push(this.colorizer[colorKey](value));
				}
			});
			return this;
		};
	}

	private backgroundMaker(bgColorKey: BackgroundColor) {
		return (data: any, textColor: ForegroundColor = "white") => {
			if (customTypeof.isObjectNative(data)) {
				this.logs.push(data);
			} else {
				this.logs.push(
					this.colorizer[bgColorKey](this.colorizer[textColor](data))
				);
			}
			return this;
		};
	}

	//* Colors =>
	black = this.foregroundMaker("black");
	blackBright = this.foregroundMaker("blackBright");
	blue = this.foregroundMaker("blue");
	blueBright = this.foregroundMaker("blueBright");
	cyan = this.foregroundMaker("cyan");
	cyanBright = this.foregroundMaker("cyanBright");
	green = this.foregroundMaker("green");
	greenBright = this.foregroundMaker("greenBright");
	magenta = this.foregroundMaker("magenta");
	magentaBright = this.foregroundMaker("magentaBright");
	red = this.foregroundMaker("red");
	redBright = this.foregroundMaker("redBright");
	white = this.foregroundMaker("white");
	whiteBright = this.foregroundMaker("whiteBright");
	yellow = this.foregroundMaker("yellow");
	yellowBright = this.foregroundMaker("yellowBright");

	//* BG Colors =>
	bgBlack = this.backgroundMaker("bgBlack");
	bgBlackBright = this.backgroundMaker("bgBlackBright");
	bgBlue = this.backgroundMaker("bgBlue");
	bgBlueBright = this.backgroundMaker("bgBlueBright");
	bgCyan = this.backgroundMaker("bgCyan");
	bgCyanBright = this.backgroundMaker("bgCyanBright");
	bgGreen = this.backgroundMaker("bgGreen");
	bgGreenBright = this.backgroundMaker("bgGreenBright");
	bgMagenta = this.backgroundMaker("bgMagenta");
	bgMagentaBright = this.backgroundMaker("bgMagentaBright");
	bgRed = this.backgroundMaker("bgRed");
	bgRedBright = this.backgroundMaker("bgRedBright");
	bgWhite = this.backgroundMaker("bgWhite");
	bgWhiteBright = this.backgroundMaker("bgWhiteBright");
	bgYellow = this.backgroundMaker("bgYellow");
	bgYellowBright = this.backgroundMaker("bgYellowBright");
}
