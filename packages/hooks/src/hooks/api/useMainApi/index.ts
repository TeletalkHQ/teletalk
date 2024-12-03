import {
	GetOutput,
	HTTPResponse,
	HTTPRouteName,
	IOSchema,
	RouteSchema,
} from "@repo/schema";
import { InitialData, UseApiOptions, useApi } from "@repo/use-api";

import { useConfigs } from "../../utils";

type UseMainApiArg<T extends IOSchema, U extends HTTPRouteName> = {
	initialData: InitialData<T["output"]>;
	name: U;
	schema: RouteSchema<T, U>;
	baseUrl?: string;
	options?: UseApiOptions;
};

export const useMainApi = <
	Input extends IOSchema["input"],
	Output extends IOSchema["output"],
	Pathnames extends IOSchema["pathnames"],
	Params extends IOSchema["params"],
	U extends HTTPRouteName,
>({
	initialData,
	name,
	schema,
	options,
}: UseMainApiArg<
	{ input: Input; output: Output; params: Params; pathnames: Pathnames },
	U
>) => {
	const { getApiHTTPBaseUrl, configs } = useConfigs();

	return useApi({
		baseUrl: getApiHTTPBaseUrl(),
		endpoint: schema.endpoint,
		endpointShortName: name,
		initialData,
		io: {
			input: schema.io.input,
			output: schema.io.output,
			params: schema.io.params,
			pathnames: schema.io.pathnames,
		},
		method: schema.method,
		options: {
			...options,
			requestDelay: configs.api.requestDelay,
		},
	});
};

export const createInitialData = <T extends RouteSchema>(
	_name: T,
	data: GetOutput<T["io"]>
): HTTPResponse<T["io"]> => {
	return {
		data,
		errors: [],
	};
};
