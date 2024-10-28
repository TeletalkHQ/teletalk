import { useDebouncedCallback as useDebouncedCallbackFromPkg } from "use-debounce";

import { useIsMounted } from "./useIsMounted";

type Params = Parameters<typeof useDebouncedCallbackFromPkg>;

export const useDebouncedCallback = <T extends Params[0]>(
	func: T,
	wait: Params[1]
) => {
	const isMounted = useIsMounted();
	const debounced = useDebouncedCallbackFromPkg(func, wait);

	return isMounted ? debounced : func;
};
