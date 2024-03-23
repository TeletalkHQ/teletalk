export interface BaseCallbacks<TryReturnType, CatchReturnType, ErrorType> {
	catch(arg0: ErrorType, ...args: any[]): CatchReturnType;
	executeIfNoError(...args: any[]): void;
	finally(
		arg0: TryReturnType | CatchReturnType | ErrorType,
		...args: any[]
	): void;
}

export type CallerName = string;

interface GlobalConfigs {
	callerName: CallerName;
	canPrintError: boolean;
}

interface Configs extends GlobalConfigs {
	shouldThrowError: boolean;
}

const globalConfigs: GlobalConfigs = {
	callerName: "unknownCaller",
	canPrintError: true,
};

class Trier<TryReturnType, CatchReturnType, ErrorType> {
	static changeGlobalConfigs(newConfigs: Partial<GlobalConfigs> = {}) {
		Object.entries(newConfigs).forEach(([key, value]) => {
			if (key === "callerName" && typeof value === "string")
				globalConfigs.callerName = value;
			if (key === "canPrintError" && typeof value === "boolean")
				globalConfigs.canPrintError = value;
		});
	}

	protected callbacks: BaseCallbacks<
		TryReturnType,
		CatchReturnType,
		ErrorType
	> = {
		catch: (): CatchReturnType => {
			return this.catchResult;
		},
		executeIfNoError: () => {},
		finally: () => {},
	};

	protected finallyArgs: any[] = [];
	protected catchArgs: any[] = [];

	protected configs: Configs = { ...globalConfigs, shouldThrowError: false };
	protected isErrorOccurred = false;
	protected tryResult: TryReturnType;
	protected error: ErrorType;
	protected catchResult: CatchReturnType;

	constructor(callerName: string) {
		this.setConfigs({ callerName });
	}

	getConfigs() {
		return this.configs;
	}
	setConfigs(newConfigs: Partial<Configs> = this.configs) {
		this.configs = { ...this.getConfigs(), ...newConfigs };
		return this;
	}

	protected handleCatchBlock(error: ErrorType) {
		this.isErrorOccurred = true;
		this.error = error;
		if (this.configs.canPrintError) this.printError();
	}
	private printError() {
		const { callerName } = this.getConfigs();
		console.error(`tried ${callerName} - and got this error: `, this.error);
		return this;
	}

	throw() {
		this.setConfigs({ shouldThrowError: true });
		return this;
	}

	executeIfNoError(
		callback: (result: TryReturnType, ...args: any[]) => void,
		...params: any[]
	) {
		this.callbacks.executeIfNoError = () => {
			if (this.isErrorOccurred === false) {
				callback(this.tryResult, ...params);
			}
		};

		return this;
	}

	catch(
		cb: BaseCallbacks<TryReturnType, CatchReturnType, ErrorType>["catch"],
		...args: any[]
	) {
		this.callbacks.catch = cb;
		this.catchArgs = args;

		return this;
	}

	finally(
		callback: BaseCallbacks<
			TryReturnType,
			CatchReturnType,
			ErrorType
		>["finally"],
		...args: any[]
	) {
		this.callbacks.finally = callback;
		this.finallyArgs = args;

		return this;
	}

	protected handleTasksAfterTry() {
		if (this.isErrorOccurred) {
			// eslint-disable-next-line promise/valid-params
			this.catchResult = this.callbacks.catch(this.error, ...this.catchArgs);
			if (this.configs.shouldThrowError) throw this.catchResult || this.error;
		}

		if (this.isErrorOccurred === false) {
			this.callbacks.executeIfNoError();
		}

		// eslint-disable-next-line promise/catch-or-return, promise/valid-params
		this.callbacks.finally(this.getResult(), ...this.finallyArgs);

		return this.getResult();
	}

	protected getResult() {
		return this.isErrorOccurred
			? this.catchResult || this.error
			: this.tryResult;
	}
}

export { Trier };
