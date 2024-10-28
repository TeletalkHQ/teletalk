import { useRouter } from "next/router";

export type UrlName = "create" | "messenger" | "signIn" | "verify";

export const useCustomRouter = () => {
	const router = useRouter();

	return {
		...router,
		push: (url: UrlName) => router.push(url),
	};
};
