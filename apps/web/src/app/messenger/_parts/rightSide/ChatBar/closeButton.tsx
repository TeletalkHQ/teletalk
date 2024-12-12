import { IconButton } from "@repo/ui/button/icon";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { IoCloseOutline } from "react-icons/io5";

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
			<DynamicIcon icon={IoCloseOutline} />
		</IconButton>
	);
};
