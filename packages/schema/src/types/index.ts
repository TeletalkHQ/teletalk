import { type VoidNoArgs } from "@repo/types";
import type { z } from "zod";

import { type IOName, type IOSchema } from "../schema";

export type GetInput<T extends IOSchema> = z.infer<T["input"]>;
export type GetOutput<T extends IOSchema> = z.infer<T["output"]>;

export type HTTPRequestBody<T extends IOSchema = IOSchema> = GetInput<T>;
export type HTTPResponse<T extends IOSchema = IOSchema> = {
	data: GetOutput<T>;
	// TODO: Use `errorStoreService`
	errors: Array<Error>;
};
export type HTTPHandlerReturnType<T extends IOSchema> = Promise<
	Omit<HTTPResponse<T>, "errors">
>;
// export type HTTPHandlerReturnType_Promise<T extends IOName> = Promise<
// 	Omit<HTTPResponse<T>, "errors">
// >;

export interface SocketRequestBody<T extends IOSchema> {
	data: z.infer<T["input"]>;
}

// TODO: Use `errorStoreService`
interface CustomError {
	reason: string;
}
export type SocketResponseErrors = Array<CustomError>;

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgs;
}

export type SocketHandlerReturnType<T extends IOSchema = IOSchema> = {
	data: GetOutput<T>;
	options?: Partial<SocketOnHandlerReturnOptions>;
};

export type SocketHandlerReturnType_Promise<T extends IOSchema> = Promise<
	SocketHandlerReturnType<T>
>;

// TODO: Refactor
export interface SocketResponse<T extends IOSchema = IOSchema>
	extends SocketHandlerReturnType<T> {
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: IOName;
}

export interface _SocketResponse<T extends IOSchema> {
	data: GetOutput<T>;
	errors: SocketResponseErrors;
	ok: boolean;
}

export type ResponseCallback<T extends IOSchema> = (
	response: SocketResponse<T>
) => void | Promise<void>;

// export type SocketResponseCallback<T extends EventName> = (
// 	response: SocketResponse<T>
// ) => Promise<void> | void;

// export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

// export type RequestTransformer<T extends EventName> = (
// 	requestData: IOCollection[T]["input"]
// ) => IOCollection[T]["input"];

// export type ResponseTransformer<T extends EventName> = (
// 	response: IOCollection[T]["output"]
// ) => IOCollection[T]["output"];

// export type Interceptor<T extends EventName> = (
// 	data: IOCollection[T]["input"] | IOCollection[T]["output"]
// ) => IOCollection[T]["input"] | IOCollection[T]["output"];

// export type Interceptors<T extends EventName> = Interceptor<T>[];
