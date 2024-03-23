import { BaseCallbacks, CallerName, Trier } from "./classes/Trier";
import { TrierAsync, trierAsync } from "./classes/TrierAsync";
import { TrierSync, trierSync } from "./classes/TrierSync";

const trier = <TryReturnType = any, CatchReturnType = any, ErrorType = any>(
	callerName: CallerName
) => ({
	sync: () =>
		new TrierSync<TryReturnType, CatchReturnType, ErrorType>(callerName),
	async: () =>
		new TrierAsync<TryReturnType, CatchReturnType, ErrorType>(callerName),
});

export { trier, Trier, trierAsync, TrierAsync, trierSync, TrierSync };

export type { BaseCallbacks, CallerName };
