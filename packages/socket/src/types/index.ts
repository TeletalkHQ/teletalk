import { IOCollection, IOName } from "@repo/schema";
import { SocketMethods, VoidNoArgs, VoidWithArg } from "@repo/types";
import { Event, Socket } from "socket.io";
import { ZodSchema, z } from "zod";

export interface Route {
	io: {
		input: ZodSchema;
		output: ZodSchema;
	};
	isAuthRequired: boolean;
}

export type SocketResponseErrors = Error[];

export interface SocketResponse<T extends IOName> {
	data: z.infer<IOCollection[T]["output"]>;
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: IOName;
}

export type ResponseCallback<T extends IOName> = (
	response: SocketResponse<T>
) => void | Promise<void>;

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgs;
}

export interface SocketHandlerReturnValue<T extends IOName> {
	data: z.infer<IOCollection[T]["output"]>;
	options?: Partial<SocketOnHandlerReturnOptions>;
}

export type SocketOnHandler<T extends IOName> = (
	socket: Socket,
	data: IOCollection[T]["input"]
) => SocketHandlerReturnValue<T> | Promise<SocketHandlerReturnValue<T>>;

export type SocketOnAnyHandler<T extends IOName> = (
	socket: Socket,
	data: IOCollection[T]["input"],
	eventName: IOName
) =>
	| void
	| Promise<void>
	| SocketHandlerReturnValue<T>
	| Promise<SocketHandlerReturnValue<T>>;

export interface SocketRoute<T extends IOName = IOName> extends Route {
	name: T;
	handler: SocketOnHandler<T>;
	method: SocketMethods;
}

export type CustomEmit<T extends IOName> = (
	eventName: IOName,
	data: SocketResponse<T>
) => void;

export type CustomOn = (
	eventName: IOName,
	callback: SocketOnHandler<any>
) => void;

export type SocketNext = (error?: Error | undefined) => void;

export type SocketMiddlewareEvent<T extends IOName> = [
	IOName,
	IOCollection[T]["input"],
	ResponseCallback<T>,
	...any[],
];

export type SocketMiddlewareReturnValue = {
	ok: boolean;
};

export type SocketDefaultEvent = Event;

export type SocketMiddleware<T extends IOName> = (
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent<T>
) =>
	| void
	| SocketMiddlewareReturnValue
	| Promise<void>
	| Promise<SocketMiddlewareReturnValue>;

export type CustomUse<T extends IOName> = (
	middleware: SocketMiddleware<T>
) => void;

export type SocketResponseCallback<T extends IOName> = (
	response: SocketResponse<T>
) => Promise<void> | void;

export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

export type RequestTransformer<T extends IOName> = (
	requestData: IOCollection[T]["input"]
) => IOCollection[T]["input"];

export type ResponseTransformer<T extends IOName> = (
	response: IOCollection[T]["output"]
) => IOCollection[T]["output"];

export type Interceptor<T extends IOName> = (
	data: IOCollection[T]["input"] | IOCollection[T]["output"]
) => IOCollection[T]["input"] | IOCollection[T]["output"];

export type Interceptors<T extends IOName> = Interceptor<T>[];
