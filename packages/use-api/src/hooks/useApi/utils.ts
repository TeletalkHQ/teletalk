import { logger } from "@repo/logger";
import { HTTPMethod, IOSchema } from "@repo/schema";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

import { HandlerOptions } from "./types";

export const getDefaultHandlerOptions = <
	T extends IOSchema,
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

export const mergeOptions = <T extends IOSchema>(
	options?: HandlerOptions<T>
) => {
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
export type MergedOptions<T extends IOSchema> = ReturnType<
	typeof mergeOptions<T>
>;

export interface CreateConfigParams<T extends IOSchema> {
	baseUrl: string;
	endpoint: string;
	// endpoint: EndPoint<T["pathnames"]>;
	method: HTTPMethod;
	options: MergedOptions<T>;
	token?: string | null;
}

export const createAxiosConfig = <T extends IOSchema>({
	baseUrl,
	endpoint,
	method,
	options,
	token,
}: CreateConfigParams<T>): AxiosRequestConfig => {
	const END_POINT = createEndpoint(options.pathnames, endpoint);
	const BASE_URL = options.config.baseURL || baseUrl;
	const { url } = options.config;

	return {
		url: url || `${BASE_URL}/${END_POINT}`,
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

export const createEndpoint = <T extends IOSchema>(
	pathnames: MergedOptions<T>["pathnames"],
	endpoint: string
	// endpoint: EndPoint<T["pathnames"]>
) => {
	return endpoint;
	// return typeof endpoint === "function" ? endpoint(pathnames) : endpoint;
};

export const handleOutputValidation = async (
	response: AxiosResponse,
	//TODO: Use features interface
	validator: IOSchema["output"],
	shouldValidate?: boolean
) => {
	if (shouldValidate && validator) {
		const result = await validator.safeParseAsync(response.data.data);

		if (result.success) return;

		const error = {
			type: "validationError",
			error: result.error,
		};

		throw error;
	}
};

export const handleRequestError = <T extends IOSchema>(
	error: unknown,
	onError: MergedOptions<T>["config"]["onError"]
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

	onError?.();
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
