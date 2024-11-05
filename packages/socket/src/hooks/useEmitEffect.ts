import { useEffect } from "react";
import { ZodSchema, z } from "zod";

import { UseEmitterParameters, useEmitter } from "./useEmitter";

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
	initialData,
}: UseEmitterParameters<T, I, O> & {
	deps: unknown[];
	data: z.infer<I>;
}) => {
	const { emitter } = useEmitter({
		baseUrl,
		namespace,
		options,
		eventName,
		io,
		initialData,
	});

	useEffect(() => {
		emitter({ data });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
