import { EventShortName, IOCollection, IOName } from "@repo/schema";
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

// TODO: Use `errorStoreService`
interface CustomError {
	reason: string;
}
export type SocketResponseErrors = Array<CustomError>;

export interface SocketResponse<T extends EventShortName> {
	data: z.infer<IOCollection[T]["output"]>;
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: IOName;
}

export interface SocketRequest<T extends EventShortName> {
	data: z.infer<IOCollection[T]["input"]>;
}

export type ResponseCallback<T extends EventShortName> = (
	response: SocketResponse<T>
) => void | Promise<void>;

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgs;
}

export interface SocketHandlerReturnValue<T extends EventShortName> {
	data: z.infer<IOCollection[T]["output"]>;
	options?: Partial<SocketOnHandlerReturnOptions>;
}

export type SocketOnHandler<T extends EventShortName> = (
	socket: Socket,
	data: IOCollection[T]["input"]
) => SocketHandlerReturnValue<T> | Promise<SocketHandlerReturnValue<T>>;

export type SocketOnAnyHandler<T extends EventShortName> = (
	socket: Socket,
	data: IOCollection[T]["input"],
	eventName: T
) =>
	| void
	| Promise<void>
	| SocketHandlerReturnValue<T>
	| Promise<SocketHandlerReturnValue<T>>;

export interface SocketRoute<T extends EventShortName = EventShortName>
	extends Route {
	name: T;
	handler: SocketOnHandler<T>;
	method: SocketMethods;
}

export type CustomEmit<T extends EventShortName> = (
	eventName: T,
	data: SocketResponse<T>
) => void;

export type CustomOn = (
	eventName: IOName,
	callback: SocketOnHandler<any>
) => void;

export type SocketNext = (error?: Error | undefined) => void;

export type SocketMiddlewareEvent<T extends EventShortName> = [
	T,
	IOCollection[T]["input"],
	ResponseCallback<T>,
	...any[],
];

export type SocketMiddlewareReturnValue = {
	ok: boolean;
};

export type SocketDefaultEvent = Event;

export type SocketMiddleware<T extends EventShortName> = (
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent<T>
) =>
	| void
	| SocketMiddlewareReturnValue
	| Promise<void>
	| Promise<SocketMiddlewareReturnValue>;

export type CustomUse<T extends EventShortName> = (
	middleware: SocketMiddleware<T>
) => void;

export type SocketResponseCallback<T extends EventShortName> = (
	response: SocketResponse<T>
) => Promise<void> | void;

export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

export type RequestTransformer<T extends EventShortName> = (
	requestData: IOCollection[T]["input"]
) => IOCollection[T]["input"];

export type ResponseTransformer<T extends EventShortName> = (
	response: IOCollection[T]["output"]
) => IOCollection[T]["output"];

export type Interceptor<T extends EventShortName> = (
	data: IOCollection[T]["input"] | IOCollection[T]["output"]
) => IOCollection[T]["input"] | IOCollection[T]["output"];

export type Interceptors<T extends EventShortName> = Interceptor<T>[];
