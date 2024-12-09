"use client";

import { useEffect } from "react";

import { type BaseArg } from "./types";
import { useSocket } from "./useSocket";

export const useListener = <T extends string>({
	baseUrl,
	event,
	listener,
	namespace,
	options,
	isOnce,
}: BaseArg & { event: T; listener: any; isOnce?: boolean }) => {
	const { socket } = useSocket({
		baseUrl,
		namespace,
		options,
	});

	useEffect(() => {
		const method = isOnce ? socket?.once : socket?.on;
		method?.bind(socket)(event, listener);

		return () => {
			socket?.off(event, listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [event, socket]);
};
