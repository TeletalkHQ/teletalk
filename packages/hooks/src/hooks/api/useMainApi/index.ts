import { HTTPRouteName, httpRoutes } from "@repo/schema";

import { useConfigs } from "../../utils";
import { InitialData, RequestPhase, useApi } from "../useApi";

type UseMainApiArg<T extends HTTPRouteName> = {
	initialData: InitialData<T>;
	name: T;
	phase?: RequestPhase;
};

export const useMainApi = <T extends HTTPRouteName>({
	initialData,
	name,
	phase,
}: UseMainApiArg<T>) => {
	const { getApiHTTPBaseUrl } = useConfigs();

	const { schema } = httpRoutes[name];

	return useApi({
		baseUrl: getApiHTTPBaseUrl(),
		endpoint: `${schema.rootPath}/${schema.pathname}`,
		endpointShortName: name,
		initialData,
		io: {
			input: schema.io.input,
			output: schema.io.output,
			params: schema.params,
			pathnames: schema.pathnames,
		},
		method: schema.method,
		phase,
	});
};
