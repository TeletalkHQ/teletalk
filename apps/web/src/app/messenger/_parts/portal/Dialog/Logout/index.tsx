import { Template } from "@repo/ui";

import { storage } from "~/classes/Storage";
import { useCustomRouter, useDialogState, useEmitter } from "~/hooks";
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
			<Template.Dialog
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
