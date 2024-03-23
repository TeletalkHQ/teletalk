import { LevelName, Logestige } from "@repo/logestige";

const colors = {
	debug: "color : #00ffff",
	error: "color : #ff0000",
	info: "color : #ff00ff",
	warn: "color : #ffff00",
};

class LoggerBrowser extends Logestige {
	constructor() {
		super();
	}

	private messageFormat = "[%t] [%l] - [%m]";

	format(level: LevelName, ...messages: any[]) {
		if (messages.some((m) => typeof m === "object")) return messages;

		const uppercaseLevel = level.toUpperCase();
		const date = new Date().toISOString();
		const color = colors[level];

		const messageBase = this.messageFormat
			.replace("%t", date)
			.replace("%l", uppercaseLevel)
			.replace("%m", messages.join(" "));

		return ["%c" + messageBase, color];
	}

	log(level: LevelName, ...messages: any[]) {
		super.log(level, ...this.format(level, ...messages));
	}
}

export { LoggerBrowser };
