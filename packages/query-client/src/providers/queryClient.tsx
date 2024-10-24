import {
	QueryClientProvider as RQQueryClientProvider,
	QueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import React from "react";

// const persister = createSyncStoragePersister({
// 	storage: typeof window === "undefined" ? undefined : window.localStorage,
// });

// const persistQueryClient = new ReactQueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: 1000 * 60 * 60 * 24,
// 			gcTime: 1000 * 60 * 60 * 24,
// 		},
// 	},
// });

export const queryClient = new ReactQueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 20,
			staleTime: 1000 * 60 * 20,
		},
	},
});

interface Props extends React.PropsWithChildren {
	queryClient?: ReactQueryClient;
}

export const QueryClientProvider: React.FC<Props> = ({
	children,
	queryClient: qcFromParams,
}) => {
	const qc = qcFromParams || queryClient;

	// useEffect(() => {
	// 	window.clearQueryCache = qc.clear;
	// }, [qc]);

	return (
		// <PersistQueryClientProvider
		// 	client={persistQueryClient}
		// 	persistOptions={{
		// 		persister,
		// 	}}
		// >
		// 	{children}
		// </PersistQueryClientProvider>
		<RQQueryClientProvider client={qc}>{children}</RQQueryClientProvider>
	);
};
