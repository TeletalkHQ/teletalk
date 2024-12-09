import { type SocketMethods } from "@repo/schema";
import { type VoidWithArg } from "@repo/types";
import type { Socket } from "socket.io-client";
import type { ZodSchema, z } from "zod";

import { type SocketOptions } from "../providers";

export type BaseArg = {
	baseUrl: string;
	namespace: string;
	options?: SocketOptions;
};

export interface ListenerParameters extends BaseArg {
	listenMethod: SocketMethods;
}

export type EmitResponse<O extends ZodSchema> = {
	data: z.infer<O>;
	ok: boolean;
	errors: Array<unknown>;
};

export type _EmitFnArg<I extends ZodSchema, O extends ZodSchema> = {
	data: z.infer<I>;
	eventName: string;
	options?: {
		onSuccess?: VoidWithArg<EmitResponse<O>>;
		// TODO: Remove `unknown`
		onError?: VoidWithArg<Array<unknown>>;
	};
	socket: Socket;
};

export type EmitterHandler<I extends ZodSchema, O extends ZodSchema> = ({
	data,
}: {
	data: _EmitFnArg<I, O>["data"];
	options?: _EmitFnArg<I, O>["options"];
}) => Promise<EmitResponse<O>>;
