import { IconButton } from "@repo/ui/button/icon";
import { CloseIcon } from "@repo/ui/icons/close";

import { useChatStore } from "~/store";

export const ChatBarCloseButton = () => {
	const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);

	const handleMessageContainerClose = () => {
		setSelectedChatId(undefined);
	};

	return (
		<IconButton
			onClick={(e) => {
				e.stopPropagation();
				handleMessageContainerClose();
			}}
		>
			<CloseIcon />
		</IconButton>
	);
};
