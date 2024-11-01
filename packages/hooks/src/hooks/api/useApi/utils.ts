import { logger } from "@repo/logger";
import { RouteName } from "@repo/schema";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { ZodSchema } from "zod";

import { EndPoint, HandlerOptions, IO, Method } from "./types";

export const getDefaultHandlerOptions = <
	T extends IO,
	U extends RouteName,
>(): HandlerOptions<T, U> => ({
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

export const mergeOptions = <T extends IO, U extends RouteName>(
	options?: HandlerOptions<T, U>
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
export type MergedOptions<T extends IO, U extends RouteName> = ReturnType<
	typeof mergeOptions<T, U>
>;

export interface CreateConfigParams<T extends IO, U extends RouteName> {
	baseUrl: string;
	endpoint: EndPoint<T["pathnames"]>;
	method: Method;
	options: MergedOptions<T, U>;
	token?: string | null;
}

export const createAxiosConfig = <T extends IO, U extends RouteName>({
	baseUrl,
	endpoint,
	method,
	options,
	token,
}: CreateConfigParams<T, U>): AxiosRequestConfig => {
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

const createEndpoint = <T extends IO, U extends RouteName>(
	pathnames: MergedOptions<T, U>["pathnames"],
	endpoint: EndPoint<T["pathnames"]>
) => {
	return typeof endpoint === "function" ? endpoint(pathnames) : endpoint;
};

export const handleOutputValidation = async (
	response: AxiosResponse,
	//TODO: Use features interface
	shouldValidate: boolean,
	validator: ZodSchema
) => {
	if (shouldValidate) {
		const result = await validator.safeParseAsync(response.data.data);

		if (result.success) return;

		throw {
			type: "validationError",
			error: result.error,
		};
	}
};

export const handleRequestError = <T extends IO, U extends RouteName>(
	error: unknown,
	mergedOptions: MergedOptions<T, U>
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
