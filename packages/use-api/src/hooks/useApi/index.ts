"use client";

import { HTTPMethod, IOSchema } from "@repo/schema";
import Timeout from "await-timeout";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";

import { useApiPhase } from "../useApiPhase";
import { axiosInstance } from "./axiosInstance";
import { HandlerOptions, InitialData, RequestPhase } from "./types";
import {
	MergedOptions,
	createAxiosConfig,
	getDefaultHandlerOptions,
	handleOutputValidation,
	handleRequestError,
	mergeOptions,
} from "./utils";

export type UseApiOptions = {
	phase?: RequestPhase;
	requestDelay?: number;
	validation?: Partial<Record<keyof IOSchema, boolean>>;
};

export type UseApiArg<T extends IOSchema, U extends string> = {
	baseUrl: string;
	endpoint: string;
	// endpoint: EndPoint<T["pathnames"]>;
	initialData: InitialData<T["output"]>;
	endpointShortName: U;
	method?: HTTPMethod;
	io: {
		input: T["input"];
		output: T["output"];
		params: T["params"];
		pathnames: T["pathnames"];
	};
	options?: UseApiOptions;
};

export const useApi = <
	Input extends IOSchema["input"],
	Output extends IOSchema["output"],
	Pathnames extends IOSchema["pathnames"],
	Params extends IOSchema["params"],
	U extends string,
>({
	baseUrl,
	endpointShortName,
	initialData,
	method = "get",
	endpoint,
	io,
	options: { phase, requestDelay, validation } = {},
}: UseApiArg<
	{ input: Input; output: Output; params: Params; pathnames: Pathnames },
	U
>) => {
	// FIXME:
	const apiPhase = useApiPhase(endpointShortName as any);

	const { setValue: setHasError, value: hasError } = useBoolean();

	const [data, setData] = useState<InitialData<Output>>(initialData);

	const handler = async (
		options: HandlerOptions<{
			input: Input;
			output: Output;
			pathnames: Pathnames;
			params: Params;
		}>
	): Promise<InitialData<Output>> => {
		const mergedOptions = mergeOptions(options);

		try {
			setHasError(false);

			return await tryToSendRequest(mergedOptions);
		} catch (error) {
			handleRequestError(error, mergedOptions.config.onError);

			setHasError(true);

			throw error;
		} finally {
			mergedOptions.config.onSettled?.();
			apiPhase.finishLoading();
			apiPhase.finishUpdating();
		}
	};

	const tryToSendRequest = async (
		options: MergedOptions<{
			input: Input;
			output: Output;
			pathnames: Pathnames;
			params: Params;
		}>
	) => {
		handleStartLoadings(phase || options.config.phase);

		const axiosConfig = createAxiosConfig<{
			input: Input;
			output: Output;
			pathnames: Pathnames;
			params: Params;
		}>({
			method,
			options,
			endpoint,
			baseUrl,
		});

		if (requestDelay) await Timeout.set(requestDelay);

		const response = await axiosInstance<InitialData<Output>>(axiosConfig);

		await handleOutputValidation(response, io.output, validation?.output);

		await options.config.onSuccess?.(response as any);

		setData(response.data);
		return response.data;
	};

	const handleStartLoadings = (phase?: RequestPhase) => {
		if (phase === "update") apiPhase.startUpdating();
		else apiPhase.startLoading();
	};

	return {
		data,
		endpointShortName,
		getDefaultHandlerOptions,
		handler,
		hasError,
		initialData,
		isLoading: apiPhase.isLoading,
		isUpdating: apiPhase.isUpdating,
		io,
	};
};

export * from "./initialData";
export * from "./utils";
export type * from "./types";
