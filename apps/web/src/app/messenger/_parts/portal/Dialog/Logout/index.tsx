import { useCustomRouter, useDialogState } from "@repo/hooks";
import { DialogTemplate } from "@repo/ui";

import { useGlobalStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

const Logout = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("logout");
	const { handler, loading } = useEmitter("logout");
	const router = useCustomRouter();

	const handleLogout = () => {
		handler.send(undefined, () => {
			globalStore.closeDialog();
			storage.remove("session");
			router.push("signIn");
		});
	};

	return (
		<>
			<DialogTemplate
				actions={
					<Actions
						loading={loading}
						onClose={globalStore.closeDialog}
						onLogout={handleLogout}
					/>
				}
				content={<Content />}
				open={dialogState.open}
			/>
		</>
	);
};

export default Logout;
