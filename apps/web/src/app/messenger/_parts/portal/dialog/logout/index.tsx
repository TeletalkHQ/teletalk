import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useLogout } from "@repo/hooks/useLogout";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";
import { useApiPhase } from "@repo/use-api";
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
						leftButtonProps={{ onClick: dialogState.close }}
						rightButtonProps={{
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
