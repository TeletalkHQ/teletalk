import { configManager } from "@repo/classes";
import { logger } from "@repo/logger";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { ZodSchema } from "zod";

import { EndPoint, HandlerOptions, IO, Method } from "./types";

export const getDefaultHandlerOptions = <
	T extends IO,
>(): HandlerOptions<T> => ({
	config: {
		headers: {},
		onError: emptyFn,
		onSettled: emptyFn,
		onSuccess: emptyFn,
		phase: "load",
		shouldSendAuthHeader: true,
	},
	data: undefined,
	params: undefined,
	pathnames: undefined,
});

export const emptyFn = () => undefined;

export const mergeOptions = <T extends IO>(options?: HandlerOptions<T>) => {
	const defaultOptions = getDefaultHandlerOptions();

	return {
		...defaultOptions,
		config: {
			...defaultOptions.config,
			...options?.config,
		},
		data: options?.data,
		params: options?.params,
		pathnames: options?.pathnames,
	};
};
export type MergedOptions<T extends IO> = ReturnType<typeof mergeOptions<T>>;

export interface CreateConfigParams<T extends IO> {
	defaultBaseUrl?: string;
	method: Method;
	options: MergedOptions<T>;
	token?: string | null;
	endpoint: EndPoint<T["pathnames"]>;
}

export const createAxiosConfig = <T extends IO>({
	defaultBaseUrl,
	method,
	options,
	token,
	endpoint,
}: CreateConfigParams<T>): AxiosRequestConfig => {
	const END_POINT = createEndpoint(options.pathnames, endpoint);
	const BASE_URL =
		options.config.url || defaultBaseUrl || configManager.getApiHTTPUrl();

	return {
		url: `${BASE_URL}/${END_POINT}`,
		method,
		shouldSendAuthHeader: options.config.shouldSendAuthHeader,
		data: options.data,
		params: options.params,

		...options.config,
		headers: {
			...options.config.headers,
			Authorization: options.config.shouldSendAuthHeader ? token : undefined,
		},
	};
};

const createEndpoint = <T extends IO>(
	pathnames: MergedOptions<T>["pathnames"],
	endpoint: EndPoint<T["pathnames"]>
) => {
	return typeof endpoint === "function" ? endpoint(pathnames) : endpoint;
};

export const handleOutputValidation = async (
	response: AxiosResponse,
	//TODO: Use features interface
	shouldValidate: boolean,
	outputValidator: ZodSchema<typeof response>
) => {
	if (shouldValidate) {
		const result = await outputValidator.safeParseAsync(response.data);

		if (result.success) return;

		throw {
			type: "validationError",
			error: result.error,
		};
	}
};

export const handleRequestError = <T extends IO>(
	error: unknown,
	mergedOptions: MergedOptions<T>
) => {
	logger.log(error);

	let message: string;

	if (
		error &&
		typeof error === "object" &&
		"type" in error &&
		error.type === "validationError"
	) {
		message =
			"Something happened to your request. Please try again later. Contact us if it persists";
	} else {
		message = getMessageFromResponse(error);
		message = fixErrorMessage(message);
	}

	toastErrorMessage(message);

	mergedOptions.config.onError?.();
};

const getMessageFromResponse = (error: unknown) => {
	const response = (error as { response: AxiosResponse })?.response?.data;
	return response?.error || response?.message || (error as Error)?.message;
};

const fixErrorMessage = (message: string | undefined) => {
	return (
		(typeof message === "object" ? JSON.stringify(message) : message) ||
		"Unknown Error"
	);
};

const toastErrorMessage = (message: string) => {
	enqueueSnackbar({
		message,
		variant: "error",
	});
};
