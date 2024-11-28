import {
	useApiPhase,
	useCustomRouter,
	useDialogState,
	useLogout,
} from "@repo/hooks";
import { DialogTemplate, DoubleAction } from "@repo/ui";
import { Suspense } from "react";

import { Content } from "./content";

export const Logout = () => {
	const dialogState = useDialogState("logout");

	const {
		api: { getApi },
	} = useLogout();

	const logoutPhase = useApiPhase("logout");

	const router = useCustomRouter();

	const handleLogout = () => {
		getApi.handler({
			data: {},
			config: {
				onSuccess: () => {
					dialogState.close();
					router.push("/auth/sign-in");
				},
			},
		});
	};

	return (
		<Suspense>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{ onClick: dialogState.close }}
						confirmProps={{
							loading: logoutPhase.isLoading,
							onClick: handleLogout,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>{" "}
		</Suspense>
	);
};
