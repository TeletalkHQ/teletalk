import { useDialogState } from "@repo/hooks/useDialogState";
import { Paper } from "@repo/ui/box/paper";

import { ChatBarCenterContent } from "./centerContent";
import { ChatBarCloseButton } from "./closeButton";
import { ChatBarMenu } from "./menu";

interface Props {}

export const ChatBar: React.FC<Props> = () => {
	const dialogState = useDialogState("userInfo");

	const handleChatBarClick = () => {
		dialogState.open();
	};

	return (
		<Paper
			style={{
				alignItems: "center",
				borderRadius: 0,
				cursor: "pointer",
				display: "flex",
				height: 50,
				justifyContent: "space-between",
				padding: 5,
			}}
			onClick={handleChatBarClick}
		>
			<ChatBarCloseButton />

			<ChatBarCenterContent />

			<ChatBarMenu />
		</Paper>
	);
};
