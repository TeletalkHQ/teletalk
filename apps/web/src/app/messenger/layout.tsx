"use client";

import { IoProvider } from "@repo/socket/src/providers";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<IoProvider
		// inputTransformer={(data) => data}
		>
			{children}
		</IoProvider>
	);
};

export default Layout;
