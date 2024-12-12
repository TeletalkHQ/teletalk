import { maker } from "@repo/classes";
import { type BaseSchema } from "@repo/schema";
import { List } from "@repo/ui/box/list";
import { ListItemButton } from "@repo/ui/box/listItemButton";

import { useChatStore } from "~/store";

import { ChatListItem } from "./chatListItem";

export const ChatList: React.FC = () => {
	const chatStore = useChatStore();

	const handleChatItemClick = (chatId: BaseSchema.ChatId) => {
		chatStore.setSelectedChatId(chatId);
	};

	const arr: BaseSchema.PrivateChats = [];

	return (
		<List className="overflow-y-auto p-1 scroll-smooth w-full">
			<ListItemButton className="w-full bg-red-600">hello</ListItemButton>
			{arr.map((item, index) => {
				const lastMessage = item.messages.at(-1) || maker.emptyMessageItem();

				return (
					<ChatListItem
						key={index}
						messageText={lastMessage.messageText}
						selected={item.chatId === chatStore.selectedChatId}
						senderId={lastMessage.sender.senderId}
						onClick={() => handleChatItemClick(item.chatId)}
					/>
				);
			})}
		</List>
	);
};
