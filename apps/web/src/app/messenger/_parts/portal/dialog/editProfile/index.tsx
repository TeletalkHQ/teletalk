import { useDialogState, useUserInfo } from "@repo/hooks";
import { useDialogStore } from "@repo/store";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

import { Content } from "./content";
import { OnProfileItemClick } from "./content/ListItem";
import { Title } from "./title";

export const EditProfile = () => {
	const dialogState = useDialogState("editProfile");
	const avatarViewerDialog = useDialogState("avatarViewer");
	const avatarSelectorDialog = useDialogState("avatarSelector");

	const setOpenDialog = useDialogStore((state) => state.setOpenDialog);

	const {
		data: { userInfo },
	} = useUserInfo();

	const handleAvatarClick = () => {
		if (userInfo.avatarSrc) avatarViewerDialog.open();
		else avatarSelectorDialog.open();
	};

	const handleItemClick: OnProfileItemClick = (item) => {
		setOpenDialog(item.name, {
			forceZIndex: 1500,
		});
	};

	return (
		<>
			<DialogTemplate
				actions={<SingleAction closeProps={{ onClick: dialogState.close }} />}
				content={
					<Content
						onAvatarClick={handleAvatarClick}
						onClick={handleItemClick}
					/>
				}
				dialogState={dialogState}
				title={<Title />}
			/>
		</>
	);
};
