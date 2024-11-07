import { maker } from "@repo/classes";
import { BaseSchema } from "@repo/schema";

import { useChatStore } from "~/store";

import ChatListItem from "./ChatListItem";

interface Props {}

const ChatList: React.FC<Props> = () => {
	const chatStore = useChatStore();

	const handleChatItemClick = (chatId: BaseSchema.ChatId) => {
		chatStore.setSelectedChatId(chatId);
	};

	const arr: BaseSchema.PrivateChats = [];

	return (
		<>
			{arr.map((item, index) => {
				const lastMessage = item.messages.at(-1) || maker.emptyMessageItem();

				return (
					<ChatListItem
						key={index}
						messageText={lastMessage.messageText}
						selected={item.chatId === chatStore.selectedChatId}
						onClick={() => handleChatItemClick(item.chatId)}
					/>
				);
			})}
		</>
	);
};

export default ChatList;
