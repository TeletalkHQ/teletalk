import { IconButton, Icons } from "@repo/ui";

import { useMessageStore } from "~/store";

const ChatBarCloseButton = () => {
	const messageStore = useMessageStore();

	const handleMessageContainerClose = () => {
		messageStore.deselectChat();
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

export default ChatBarCloseButton;
