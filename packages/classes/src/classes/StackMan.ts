export interface StackManOptions {
	isFullLine: boolean;
}
// UNUSED - Replace with pkg
export class StackMan {
	options: StackManOptions;

	constructor(isFullLine: boolean) {
		this.options = {
			isFullLine,
		};
	}

	getFileName(): string | undefined {
		const fileName = this.getStackLines().trim().split(/\(|\)/g)[1];
		if (this.options.isFullLine) return fileName;

		return fileName?.split("/").at(-1) || "";
	}

	private getStackLines(): string {
		return this.getStackTrace().split("\n")[8] || "";
	}

	private getStackTrace(): string {
		return new Error().stack || "";
	}
}
