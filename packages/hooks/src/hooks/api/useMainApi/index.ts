import {
	GetOutput,
	HTTPResponse,
	HTTPRouteName,
	httpRoutes,
} from "@repo/schema";

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
	const { getApiHTTPBaseUrl, configs } = useConfigs();

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
		requestDelay: configs.api.requestDelay,
	});
};

export const createRequestInitialData = <T extends HTTPRouteName>(
	_name: T,
	data: GetOutput<T>
): HTTPResponse<T> => {
	return {
		data,
		errors: [],
	};
};
