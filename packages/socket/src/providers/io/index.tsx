import { PropsWithChildren, useRef } from "react";

import { IoContext, SocketCollection } from "./context";

interface Props {}

export const IoProvider: React.FC<PropsWithChildren & Props> = ({
	children,
}) => {
	const socketCollection = useRef<SocketCollection>([]);

	return (
		<IoContext.Provider value={{ socketCollection }}>
			{children}
		</IoContext.Provider>
	);
};

export * from "./context";
