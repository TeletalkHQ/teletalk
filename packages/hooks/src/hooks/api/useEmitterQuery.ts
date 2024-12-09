import type { EventSchema } from "@repo/schema";
import type {
	DefaultError,
	DefinedInitialDataOptions,
	DefinedUseQueryResult,
	QueryClient,
	QueryKey,
	UndefinedInitialDataOptions,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";

import type { UseMainEmitterParameters } from "./useMainEmitter";
import { useMainEmitter } from "./useMainEmitter";
import { useMainQuery } from "./useMainQuery";

export function useEmitterQuery<
	E extends EventSchema,
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	emitterOptions: UseMainEmitterParameters<E>,
	queryOptions: {
		options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>;
		queryClient?: QueryClient;
	}
): {
	queryResult: DefinedUseQueryResult<TData, TError>;
	emitterResult: ReturnType<typeof useMainEmitter>;
};

export function useEmitterQuery<
	E extends EventSchema,
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	emitterOptions: UseMainEmitterParameters<E>,
	queryOptions: {
		options: UndefinedInitialDataOptions<
			TQueryFnData,
			TError,
			TData,
			TQueryKey
		>;
		queryClient?: QueryClient;
	}
): {
	queryResult: UseQueryResult<TData, TError>;
	emitterResult: ReturnType<typeof useMainEmitter>;
};

export function useEmitterQuery<
	E extends EventSchema,
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	emitterOptions: UseMainEmitterParameters<E>,
	queryOptions: {
		options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
		queryClient?: QueryClient;
	}
): {
	queryResult: UseQueryResult<TData, TError>;
	emitterResult: ReturnType<typeof useMainEmitter>;
} {
	const emitterResult = useMainEmitter(emitterOptions);

	const queryResult = useMainQuery(
		{
			...queryOptions.options,
			enabled: !!emitterResult.socket && queryOptions.options.enabled,
			initialData: undefined,
		},
		queryOptions.queryClient
	);

	return {
		emitterResult,
		queryResult,
	};
}
