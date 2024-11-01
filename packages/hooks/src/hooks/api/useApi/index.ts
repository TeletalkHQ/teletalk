"use client";

import { RouteName } from "@repo/schema";
import { useState } from "react";
import { ZodSchema } from "zod";

import { useBoolean, useFeatures } from "../../utils";
import { axiosInstance } from "./axiosInstance";
import {
	EndPoint,
	HandlerOptions,
	InitialData,
	Method,
	RequestPhase,
} from "./types";
import { useApiPhase } from "./useApiPhase";
import {
	MergedOptions,
	createAxiosConfig,
	getDefaultHandlerOptions,
	handleOutputValidation,
	handleRequestError,
	mergeOptions,
} from "./utils";

export type UseApiArg<
	T extends RouteName,
	Input extends ZodSchema | undefined,
	Output extends ZodSchema,
	Pathnames extends ZodSchema<any> | undefined,
	Parameters extends ZodSchema | undefined,
> = {
	baseUrl: string;
	endpoint: EndPoint<Pathnames>;
	endpointShortName: T;
	initialData: InitialData<T>;
	method?: Method;
	phase?: RequestPhase;
	io: {
		input: Input;
		output: Output;
		params: Parameters;
		pathnames: Pathnames;
	};
};

export const useApi = <
	T extends RouteName,
	Input extends ZodSchema | undefined,
	Output extends ZodSchema,
	Pathnames extends ZodSchema | undefined,
	Parameters extends ZodSchema | undefined,
>({
	baseUrl,
	endpointShortName,
	initialData,
	method = "get",
	phase,
	endpoint,
	io: IO,
}: UseApiArg<T, Input, Output, Pathnames, Parameters>) => {
	const apiPhase = useApiPhase(endpointShortName);

	const { features } = useFeatures();

	const { update: setHasError, value: hasError } = useBoolean();

	const [data, setData] = useState<InitialData<T>>(initialData);

	type InferredIO = {
		input: Input;
		output: Output;
		pathnames: Pathnames;
		params: Parameters;
	};

	const handler = async (
		options: HandlerOptions<InferredIO, T>
	): Promise<InitialData<T>> => {
		const mergedOptions = mergeOptions(options);

		try {
			setHasError(false);

			return await tryToSendRequest(mergedOptions);
		} catch (error) {
			handleRequestError(error, mergedOptions);

			setHasError(true);

			throw error;
		} finally {
			mergedOptions.config.onSettled?.();
			apiPhase.finishLoading();
			apiPhase.finishUpdating();
		}
	};

	const tryToSendRequest = async (options: MergedOptions<InferredIO, T>) => {
		handleStartLoadings(phase || options.config.phase);

		const axiosConfig = createAxiosConfig<InferredIO, T>({
			method,
			options,
			endpoint,
			baseUrl,
		});

		const response = await axiosInstance<InitialData<T>>(axiosConfig);

		await handleOutputValidation(response, features.apiValidation, IO.output);

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
	};
};

export type * from "./types";
export * from "./initialData";
