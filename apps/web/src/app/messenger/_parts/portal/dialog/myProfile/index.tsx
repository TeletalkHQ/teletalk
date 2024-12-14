import { useDialogState } from "@repo/hooks/useDialogState";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { useDialogStore } from "@repo/store";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

import { Content } from "./content";
import { type OnProfileItemClick } from "./content/ListItem";
import { Title } from "./title";

export const MyProfile = () => {
	const dialogState = useDialogState("myProfile");
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
				actions={<SingleAction buttonProps={{ onClick: dialogState.close }} />}
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
