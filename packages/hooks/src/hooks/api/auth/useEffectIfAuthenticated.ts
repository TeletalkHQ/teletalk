"use client";

import type { VoidNoArgs } from "@repo/types";
import { useEffect } from "react";

import { useIsAuthenticated } from "./useIsAuthenticated";

export const useEffectIfAuthenticated = (
	cb: VoidNoArgs,
	deps: Array<unknown> = []
) => {
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		if (isAuthenticated) {
			cb();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, isAuthenticated]);
};
