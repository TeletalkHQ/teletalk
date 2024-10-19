import { VoidNoArgs } from "@repo/types";
import { z } from "zod";

import { EventShortName, IOCollection, IOName } from "../schema";

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

export interface SocketRequestBody<T extends EventShortName> {
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

export type SocketHandlerReturnType<T extends EventShortName> = {
	data: GetOutput<T>;
	options?: Partial<SocketOnHandlerReturnOptions>;
};

export type SocketHandlerReturnType_Promise<T extends EventShortName> = Promise<
	SocketHandlerReturnType<T>
>;

export interface SocketResponse<T extends EventShortName>
	extends SocketHandlerReturnType<T> {
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: IOName;
}

export type ResponseCallback<T extends EventShortName> = (
	response: SocketResponse<T>
) => void | Promise<void>;

// export type SocketResponseCallback<T extends EventShortName> = (
// 	response: SocketResponse<T>
// ) => Promise<void> | void;

// export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

// export type RequestTransformer<T extends EventShortName> = (
// 	requestData: IOCollection[T]["input"]
// ) => IOCollection[T]["input"];

// export type ResponseTransformer<T extends EventShortName> = (
// 	response: IOCollection[T]["output"]
// ) => IOCollection[T]["output"];

// export type Interceptor<T extends EventShortName> = (
// 	data: IOCollection[T]["input"] | IOCollection[T]["output"]
// ) => IOCollection[T]["input"] | IOCollection[T]["output"];

// export type Interceptors<T extends EventShortName> = Interceptor<T>[];
