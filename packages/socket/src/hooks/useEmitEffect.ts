import { VoidNoArgs } from "@repo/types";
import { useEffect } from "react";
import { ZodSchema, z } from "zod";

import { EmitterParameters } from "./types";
import { useEmitter } from "./useEmitter";

export const useEmitEffect = <
	T extends string,
	I extends ZodSchema,
	O extends ZodSchema,
>({
	baseUrl,
	namespace,
	options,
	deps,
	eventName,
	io,
	data,
}: EmitterParameters<T, I, O> & {
	fn: VoidNoArgs;
	deps: unknown[];
	data: z.infer<I>;
}) => {
	const { emitter } = useEmitter({
		baseUrl,
		namespace,
		options,
		eventName,
		io,
	});

	useEffect(() => {
		emitter({ data });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
