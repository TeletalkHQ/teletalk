import { BaseCallbacks, CallerName, Trier } from "./Trier";

interface Callbacks<TryReturnType, CatchReturnType, ErrorType>
	extends BaseCallbacks<TryReturnType, CatchReturnType, ErrorType> {
	try: (...args: any[]) => TryReturnType;
}

class TrierSync<TryReturnType, CatchReturnType, ErrorType> extends Trier<
	TryReturnType,
	CatchReturnType,
	ErrorType
> {
	private tryArgs: any[] = [];

	protected callbacks: Callbacks<TryReturnType, CatchReturnType, ErrorType> = {
		...this.callbacks,
		try: () => {
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

	run(): TryReturnType | CatchReturnType | ErrorType {
		try {
			this.tryResult = this.callbacks.try(...this.tryArgs);
		} catch (error) {
			this.handleCatchBlock(error as ErrorType);
		}

		return this.handleTasksAfterTry();
	}
}

const trierSync = <TryReturnType, CatchReturnType, ErrorType>(
	callerName: CallerName
) => new TrierSync<TryReturnType, CatchReturnType, ErrorType>(callerName);

export { trierSync, TrierSync };
