import { SocketMethods } from "@repo/types";
import { ZodSchema, z } from "zod";

import { SocketOptions } from "../providers";

export type BaseArg = {
	baseUrl: string;
	namespace: string;
	options?: SocketOptions;
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

export type EmitResponse<O extends ZodSchema> = {
	data: z.infer<O>;
	ok: boolean;
	errors: Array<unknown>;
};

export type EmitterHandler<I extends ZodSchema, O extends ZodSchema> = ({
	data,
}: {
	data: z.infer<I>;
}) => Promise<EmitResponse<O>>;
