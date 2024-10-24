import { VoidNoArgs } from "@repo/types";
import { useEffect, useRef } from "react";

export const useDidUpdate = (func: VoidNoArgs, deps: unknown[]) => {
	const wasMounted = useRef(false);

	useEffect(() => {
		if (wasMounted.current) func();
		else wasMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
