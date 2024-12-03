"use client";

import {
	QueryClient,
	QueryClientProvider as QueryClientProvider_pkg,
	isServer,
} from "@tanstack/react-query";
import React from "react";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export function QueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider_pkg client={queryClient}>
			{children}
		</QueryClientProvider_pkg>
	);
}
