"use client";

import { useIsClient } from "usehooks-ts";

type ClientOnlyProps = {
	children: React.ReactNode;
};

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const isClient = useIsClient();

	return isClient ? <>{children}</> : null;
};
