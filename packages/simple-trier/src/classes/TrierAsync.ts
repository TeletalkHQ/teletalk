import { BaseCallbacks, CallerName, Trier } from "./Trier";

interface Callbacks<TryReturnType, CatchReturnType, ErrorType>
	extends BaseCallbacks<TryReturnType, CatchReturnType, ErrorType> {
	try: (...args: any[]) => Promise<TryReturnType>;
}

class TrierAsync<TryReturnType, CatchReturnType, ErrorType> extends Trier<
	TryReturnType,
	CatchReturnType,
	ErrorType
> {
	private tryArgs: any[] = [];

	protected callbacks: Callbacks<TryReturnType, CatchReturnType, ErrorType> = {
		...this.callbacks,
		try: async () => {
			return this.tryResult;
		},
	};
	constructor(callerName: string) {
		super(callerName);
	}

	try(
		cb: Callbacks<TryReturnType, CatchReturnType, ErrorType>["try"],
		...args: any[]
	) {
		this.callbacks.try = cb;
		this.tryArgs = args;

		return this;
	}

	async run(): Promise<TryReturnType | CatchReturnType | ErrorType> {
		try {
			this.tryResult = await this.callbacks.try(...this.tryArgs);
		} catch (error) {
			this.handleCatchBlock(error as ErrorType);
		}

		return this.handleTasksAfterTry();
	}
}

const trierAsync = <TryReturnType, CatchReturnType, ErrorType>(
	callerName: CallerName
) => new TrierAsync<TryReturnType, CatchReturnType, ErrorType>(callerName);

export { trierAsync, TrierAsync };
