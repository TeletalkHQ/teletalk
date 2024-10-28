import { HTTPRoutes, RouteName } from "@repo/schema";
import { VoidNoArgs } from "@repo/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodSchema, z } from "zod";

// TODO: Merge with `GetHandlerOptionsByUrl`
export type IO = {
	input: ZodSchema | undefined;
	output: ZodSchema | string | undefined;
	params: ZodSchema | undefined;
	pathnames: ZodSchema | undefined;
};

export type EndPoint<T extends IO["pathnames"]> = T extends ZodSchema
	? (pathnames: z.infer<T>) => string
	: string;

export type Method = "get" | "post" | "put" | "patch" | "delete";

export type GetResponseBySchema<T extends IO> = AxiosResponse<
	T["output"] extends ZodSchema
		? { data: z.infer<T["output"]>; errors: Array<unknown> }
		: undefined,
	any
>;

export type HandlerCallbacks<T extends IO> = {
	onSuccess: (response: GetResponseBySchema<T>) => void | Promise<void>;
	onError: VoidNoArgs;
	onSettled: VoidNoArgs;
};

export type RequestConfig = Omit<AxiosRequestConfig, "params">;

export type RequestPhase = "load" | "update";

export type HandlerConfig<T extends IO> = RequestConfig &
	Partial<HandlerCallbacks<T>> & {
		phase?: RequestPhase;
		shouldSendAuthHeader?: boolean;
	};

export type HandlerOptions<T extends IO> = (T["params"] extends ZodSchema
	? {
			params: z.infer<T["params"]>;
		}
	: {
			params?: never;
		}) &
	(T["pathnames"] extends ZodSchema
		? {
				pathnames: z.infer<T["pathnames"]>;
			}
		: {
				pathnames?: never;
			}) &
	(T["input"] extends ZodSchema
		? {
				data: z.infer<T["input"]>;
			}
		: {
				data?: never;
			}) & {
		config?: HandlerConfig<T>;
	};

type AnyFn = (...arg: any[]) => any;

export type GetHandlerOptionsByUrl<T extends RouteName> = HandlerOptions<{
	input: HTTPRoutes[T]["schema"]["io"]["input"];
	output: HTTPRoutes[T]["schema"]["io"]["output"];
	params: HTTPRoutes[T]["schema"]["params"];
	pathnames: HTTPRoutes[T]["schema"]["pathnames"];
}>;

export type GetOptionsByAPI<API extends AnyFn> = Parameters<API>[0];

export type RequestHandler<API extends AnyFn, U = void> = (
	options: GetOptionsByAPI<API>,
	extraOptions: U
) => Promise<ReturnType<API>["0"]>;

export type GetReturnTypeByAPI<API extends AnyFn> = ReturnType<API>;

export type VoidRequestHandler<API extends AnyFn, U = void> = (
	options: GetOptionsByAPI<API>,
	extraOptions: U
) => void;
