import { VoidNoArgs } from "@repo/types";
import { z } from "zod";

import { EventName } from "../classes";
import { IOCollection, IOName } from "../schema";

export type GetInput<T extends IOName> = z.infer<IOCollection[T]["input"]>;
export type GetOutput<T extends IOName> = z.infer<IOCollection[T]["output"]>;

export type HTTPRequestBody<T extends IOName> = GetInput<T>;
export type HTTPResponse<T extends IOName> = {
	data: GetOutput<T>;
	// TODO: Use `errorStoreService`
	errors: Array<Error>;
};
export type HTTPHandlerReturnType<T extends IOName> = Promise<
	Omit<HTTPResponse<T>, "errors">
>;
// export type HTTPHandlerReturnType_Promise<T extends IOName> = Promise<
// 	Omit<HTTPResponse<T>, "errors">
// >;

export interface SocketRequestBody<T extends EventName> {
	data: z.infer<IOCollection[T]["input"]>;
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

export type SocketHandlerReturnType<T extends EventName> = {
	data: GetOutput<T>;
	options?: Partial<SocketOnHandlerReturnOptions>;
};

export type SocketHandlerReturnType_Promise<T extends EventName> = Promise<
	SocketHandlerReturnType<T>
>;

// TODO: Refactor
export interface SocketResponse<T extends EventName>
	extends SocketHandlerReturnType<T> {
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: IOName;
}

export interface _SocketResponse<T extends EventName> {
	data: GetOutput<T>;
	errors: SocketResponseErrors;
	ok: boolean;
}

export type ResponseCallback<T extends EventName> = (
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
