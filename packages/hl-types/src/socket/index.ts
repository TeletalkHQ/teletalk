import { NativeError } from "@repo/error-store";
import {
	EventName,
	IOCollection,
	VoidNoArgsFn,
	VoidWithArg,
} from "@repo/type-store";
import { ValidatorFnType } from "@repo/validator";
import { Event, Socket } from "socket.io";

export interface Route {
	inputValidator?: ValidatorFnType;
	outputValidator?: ValidatorFnType;
	isAuthRequired: boolean;
}

export type SocketResponseErrors = NativeError[];

export interface SocketResponse<T extends EventName> {
	data: IOCollection[T]["output"];
	errors: SocketResponseErrors;
	ok: boolean;
	eventName: EventName;
}

export type ResponseCallback<T extends EventName> = (
	response: SocketResponse<T>
) => void | Promise<void>;

export type SocketMethods = "on" | "onAny" | "customOn" | "once";

export interface SocketOnHandlerReturnOptions {
	shouldEmitReturnValue: boolean;
	shouldCallResponseCallback: boolean;
	shouldEmitToUserRooms: boolean;
	cbAfterEmit: VoidNoArgsFn;
}

export interface SocketHandlerReturnValue<T extends EventName> {
	data: IOCollection[T]["output"];
	options?: Partial<SocketOnHandlerReturnOptions>;
}

export type SocketOnHandler<T extends EventName> = (
	socket: Socket,
	data: IOCollection[T]["input"]
) => SocketHandlerReturnValue<T> | Promise<SocketHandlerReturnValue<T>>;

//TODO: Remove IO extends

export type SocketOnAnyHandler<T extends EventName> = (
	socket: Socket,
	data: IOCollection[T]["input"],
	eventName: EventName
) =>
	| void
	| Promise<void>
	| SocketHandlerReturnValue<T>
	| Promise<SocketHandlerReturnValue<T>>;

export interface SocketRoute<T extends EventName = EventName> extends Route {
	name: T;
	handler: SocketOnHandler<T>;
	method: SocketMethods;
}

export type CustomEmit<T extends EventName> = (
	eventName: EventName,
	data: SocketResponse<T>
) => void;

export type CustomOn = (
	eventName: EventName,
	callback: SocketOnHandler<any>
) => void;

export type SocketNext = (error?: Error | undefined) => void;

export type SocketMiddlewareEvent<T extends EventName> = [
	EventName,
	IOCollection[T]["input"],
	ResponseCallback<T>,
	...any[],
];

export type SocketMiddlewareReturnValue = {
	ok: boolean;
};

export type SocketDefaultEvent = Event;

export type SocketMiddleware<T extends EventName> = (
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent<T>
) =>
	| void
	| SocketMiddlewareReturnValue
	| Promise<void>
	| Promise<SocketMiddlewareReturnValue>;

export type CustomUse<T extends EventName> = (
	middleware: SocketMiddleware<T>
) => void;

export type SocketResponseCallback<T extends EventName> = (
	response: SocketResponse<T>
) => Promise<void> | void;

export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

export type RequestTransformer<T extends EventName> = (
	requestData: IOCollection[T]["input"]
) => IOCollection[T]["input"];

export type ResponseTransformer<T extends EventName> = (
	response: IOCollection[T]["output"]
) => IOCollection[T]["output"];

export type Interceptor<T extends EventName> = (
	data: IOCollection[T]["input"] | IOCollection[T]["output"]
) => IOCollection[T]["input"] | IOCollection[T]["output"];

export type Interceptors<T extends EventName> = Interceptor<T>[];
