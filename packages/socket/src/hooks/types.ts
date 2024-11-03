import { SocketMethods } from "@repo/types";
import { ZodSchema, z } from "zod";

import { SocketStore } from "../store/socket";

export type BaseArg = {
	baseUrl: string;
	namespace: string;
	options?: SocketStore.SocketOptions;
};

export interface EmitterParameters<
	T extends string,
	I extends ZodSchema,
	O extends ZodSchema,
> extends BaseArg {
	eventName: T;
	io: {
		input: I;
		output: O;
	};
}

export interface ListenerParameters extends BaseArg {
	listenMethod: SocketMethods;
}

export type EmitterHandler<I extends ZodSchema, O extends ZodSchema> = ({
	data,
}: {
	data: z.infer<I>;
}) => Promise<{
	data: z.infer<O>;
}>;
