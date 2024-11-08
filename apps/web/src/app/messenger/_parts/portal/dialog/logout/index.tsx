import {
	useApiPhase,
	useCustomRouter,
	useDialogState,
	useLogout,
} from "@repo/hooks";
import { DialogTemplate } from "@repo/ui";

import { Actions } from "./actions";
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
		<>
			<DialogTemplate
				actions={
					<Actions
						loading={logoutPhase.isLoading}
						onClose={dialogState.close}
						onLogout={handleLogout}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
