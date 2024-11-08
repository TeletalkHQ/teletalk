import { useDialogState } from "@repo/hooks";
import { Box } from "@repo/ui";

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
		<>
			<Box.Paper
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
			</Box.Paper>
		</>
	);
};
