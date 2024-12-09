"use client";

import { useEffect } from "react";

import type { BaseArg } from "./types";
import { useSocket } from "./useSocket";

export const useDisconnectOnUnmount = ({ baseUrl, namespace }: BaseArg) => {
	const { socket } = useSocket({ baseUrl, namespace });

	useEffect(() => {
		return () => {
			socket?.disconnect();
		};
	}, [socket]);
};
