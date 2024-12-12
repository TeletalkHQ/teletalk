"use client";

import { IoProvider } from "@repo/socket/src/providers";
import { Div } from "@repo/ui/box/div";
import { type PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<IoProvider
		// inputTransformer={(data) => data}
		>
			<Div className="p-4 flex h-screen gap-2">{children}</Div>
		</IoProvider>
	);
};

export default Layout;
