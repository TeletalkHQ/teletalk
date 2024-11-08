"use client";

import { IoProvider } from "@repo/socket/src/providers";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<IoProvider
		// inputTransformer={(data) => data}
		>
			{children}
		</IoProvider>
	);
};
