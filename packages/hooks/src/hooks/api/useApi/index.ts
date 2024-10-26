"use client";

import { HTTPRouteShortName } from "@repo/schema";
import { useState } from "react";
import { ZodSchema, z } from "zod";

import { useBoolean } from "../../useBoolean";
import { useFeatures } from "../../useFeatures";
import { axiosInstance } from "./axiosInstance";
import { EndPoint, HandlerOptions, Method, RequestPhase } from "./types";
import { useApiPhase } from "./useApiPhase";
import {
	MergedOptions,
	createAxiosConfig,
	getDefaultHandlerOptions,
	handleOutputValidation,
	handleRequestError,
	mergeOptions,
} from "./utils";

type Arg<
	T extends HTTPRouteShortName,
	Input extends ZodSchema | undefined,
	Output extends ZodSchema,
	Pathnames extends ZodSchema<any> | undefined,
	Parameters extends ZodSchema | undefined,
> = {
	defaultBaseUrl?: string;
	endpoint: EndPoint<Pathnames>;
	endpointShortName: T;
	initialData: z.infer<Output>;
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
	T extends HTTPRouteShortName,
	Input extends ZodSchema | undefined,
	Output extends ZodSchema,
	Pathnames extends ZodSchema | undefined,
	Parameters extends ZodSchema | undefined,
>({
	defaultBaseUrl,
	endpointShortName,
	initialData,
	method = "get",
	phase,
	endpoint,
	io: IO,
}: Arg<T, Input, Output, Pathnames, Parameters>) => {
	const apiPhase = useApiPhase(endpointShortName);

	const { features } = useFeatures();

	const { update: setHasError, value: hasError } = useBoolean();

	type FoundOutput = typeof initialData;

	const [data, setData] = useState<FoundOutput>(initialData);

	type InferredIO = {
		input: Input;
		output: Output;
		pathnames: Pathnames;
		params: Parameters;
	};

	const handler = async (
		options: HandlerOptions<InferredIO>
	): Promise<FoundOutput> => {
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

	const tryToSendRequest = async (options: MergedOptions<InferredIO>) => {
		handleStartLoadings(phase || options.config.phase);

		const axiosConfig = createAxiosConfig<InferredIO>({
			defaultBaseUrl,
			method,
			options,
			endpoint,
		});

		const response = await axiosInstance<FoundOutput>(axiosConfig);

		await handleOutputValidation(response, features.apiValidation, IO.output);

		await options.config.onSuccess?.(response);

		setData(response.data);
		return response.data;
	};

	const handleStartLoadings = (phase?: RequestPhase) => {
		if (phase === "update") apiPhase.startUpdating();
		else apiPhase.startLoading();
	};

	return {
		data,
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
