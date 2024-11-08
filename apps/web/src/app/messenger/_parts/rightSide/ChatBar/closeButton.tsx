import { IconButton, Icons } from "@repo/ui";

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
			<Icons.Close.Element />
		</IconButton>
	);
};
