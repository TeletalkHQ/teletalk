"use client";

import { StringMap } from "@repo/types";
import { useRouter } from "next/navigation";

export type Path =
	| "/auth/create"
	| "messenger"
	| "/auth/sign-in"
	| "/auth/verify";

export const useCustomRouter = () => {
	const router = useRouter();

	const push = (url: Path, queries: StringMap = {}) => {
		const queriesLength = Object.keys(queries).length;

		const queryString = Object.entries(queries)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		router.push(`${url}${queriesLength ? `?${queryString}` : ""}`);
	};

	return {
		...router,
		push,
	};
};
