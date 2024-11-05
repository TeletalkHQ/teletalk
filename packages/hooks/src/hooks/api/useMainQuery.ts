import { BaseSchema, EventName } from "@repo/schema";
import {
	DefaultError,
	DefinedInitialDataOptions,
	DefinedUseQueryResult,
	QueryClient,
	QueryKey,
	UndefinedInitialDataOptions,
	UseQueryOptions,
	UseQueryResult,
	useQuery,
} from "@tanstack/react-query";

export const queryKeys = {
	getUserPublicInfo: ({ userId }: { userId: BaseSchema.UserId }) => [
		"getUserPublicInfo",
		userId,
	],
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
