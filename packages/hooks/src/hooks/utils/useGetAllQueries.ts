import { Params } from "../../types";

export const useGetAllQueries = () => {
	const getParams = (): Partial<Params> => {
		if (typeof window === "undefined") return {};

		const urlSearchParams = new URLSearchParams(window.location.search);
		return Object.fromEntries(urlSearchParams.entries());
	};

	return getParams();
};
