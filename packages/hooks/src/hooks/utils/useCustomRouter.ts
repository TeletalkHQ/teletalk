"use client";

import { useRouter } from "next/navigation";

export type UrlName = "create" | "messenger" | "signIn" | "verify";

export const useCustomRouter = () => {
	const router = useRouter();

	return {
		...router,
		push: (url: UrlName) => router.push(url),
	};
};
