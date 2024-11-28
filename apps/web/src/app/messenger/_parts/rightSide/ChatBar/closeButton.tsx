import { CloseIcon, IconButton } from "@repo/ui";

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
