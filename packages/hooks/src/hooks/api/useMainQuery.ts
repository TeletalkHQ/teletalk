import { type BaseSchema, type EventName } from "@repo/schema";
import type {
	QueryClient } from "@tanstack/react-query";
import {
	type DefaultError,
	type DefinedInitialDataOptions,
	type DefinedUseQueryResult,
	type QueryKey,
	type UndefinedInitialDataOptions,
	type UseQueryOptions,
	type UseQueryResult,
	useQuery,
} from "@tanstack/react-query";

export const queryKeys = {
	getUserPublicInfo: ({
		userId,
	}: {
		userId: BaseSchema.UserId | undefined;
	}) => ["getUserPublicInfo", userId],
	getUserInfo: ["getUserInfo"],
} satisfies Partial<
	Record<EventName, Array<any> | ((...args: any[]) => Array<any>)>
>;

export function useMainQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
	queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError>;

export function useMainQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
	queryClient?: QueryClient
): UseQueryResult<TData, TError>;

export function useMainQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	{
		queryKey,
		...rest
	}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
	queryClient?: QueryClient
) {
	return useQuery(
		{
			queryKey,
			...rest,
		},
		queryClient
	);
}
