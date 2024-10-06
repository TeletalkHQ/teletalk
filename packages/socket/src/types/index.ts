import { EventShortName, IOCollection } from "@repo/schema";
import { VoidNoArgsFn, VoidWithArg } from "@repo/types";
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

export interface SocketResponse<T extends EventShortName> {
	data: z.infer<IOCollection[T]["output"]>;
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: EventShortName;
}

export type ResponseCallback<T extends EventShortName> = (
	response: SocketResponse<T>
) => void | Promise<void>;

export type SocketMethods = "on" | "onAny" | "once";

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgsFn;
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
	eventName: EventShortName
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
	eventName: EventShortName,
	data: SocketResponse<T>
) => void;

export type CustomOn = (
	eventName: EventShortName,
	callback: SocketOnHandler<any>
) => void;

export type SocketNext = (error?: Error | undefined) => void;

export type SocketMiddlewareEvent<T extends EventShortName> = [
	EventShortName,
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
