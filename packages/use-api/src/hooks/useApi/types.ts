import type { IOSchema } from "@repo/schema";
import type { VoidNoArgs } from "@repo/types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { ZodUndefined, z } from "zod";

export type InitialData<T extends IOSchema["output"]> = T extends ZodUndefined
	? undefined
	: { data: z.infer<T>; errors: Array<unknown> };

export type GetResponseBySchema<T extends IOSchema["output"]> = AxiosResponse<
	InitialData<T>,
	any
>;

export type HandlerCallbacks<T extends IOSchema["output"]> = {
	onSuccess: (response: GetResponseBySchema<T>) => void | Promise<void>;
	onError: VoidNoArgs;
	onSettled: VoidNoArgs;
};

export type RequestConfig = Omit<AxiosRequestConfig, "params">;

export type RequestPhase = "load" | "update";

export type HandlerConfig<T extends IOSchema["output"]> = RequestConfig &
	Partial<HandlerCallbacks<T>> & {
		phase?: RequestPhase;
		shouldSendAuthHeader?: boolean;
	};

export type HandlerOptions<T extends IOSchema> =
	(T["params"] extends ZodUndefined
		? {
				params?: never;
			}
		: {
				params: z.infer<T["params"]>;
			}) &
		(T["pathnames"] extends ZodUndefined
			? {
					pathnames?: never;
				}
			: {
					pathnames: z.infer<T["pathnames"]>;
				}) &
		(T["input"] extends ZodUndefined
			? {
					data?: never;
				}
			: {
					data: z.infer<T["input"]>;
				}) & {
			config?: HandlerConfig<T["output"]>;
		};

type AnyFn = (...arg: any[]) => any;

export type GetHandlerOptionsByUrl<T extends IOSchema> = HandlerOptions<T>;

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
