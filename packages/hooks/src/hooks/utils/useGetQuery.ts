import { ParamKey } from "../../types";
import { useGetAllQueries } from "./useGetAllQueries";

export const useGetQuery = (key: ParamKey) => {
	const queries = useGetAllQueries();

	return queries[key];
};
