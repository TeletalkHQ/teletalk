"use client";

import { type PropsWithChildren, useRef } from "react";

import {
	type InputTransformer,
	IoContext,
	type SocketCollection,
} from "./context";

interface Props {
	inputTransformer?: InputTransformer;
}

export const IoProvider: React.FC<PropsWithChildren & Props> = ({
	children,
	inputTransformer = (data: unknown) => data,
}) => {
	const socketCollection = useRef<SocketCollection>([]);

	return (
		<IoContext.Provider
			value={{
				inputTransformer,
				socketCollection,
			}}
		>
			{children}
		</IoContext.Provider>
	);
};

export * from "./context";
