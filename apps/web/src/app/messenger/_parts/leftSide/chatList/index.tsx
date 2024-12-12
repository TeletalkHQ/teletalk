import { maker } from "@repo/classes";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type BaseSchema } from "@repo/schema";
import { List } from "@repo/ui/box/list";

import { useChatStore } from "~/store";

import { ChatListItem } from "./chatListItem";

export const ChatList: React.FC = () => {
	const chatStore = useChatStore();

	const {
		data: { userInfo },
	} = useUserInfo();

	const handleChatItemClick = (chatId: BaseSchema.ChatId) => {
		chatStore.setSelectedChatId(chatId);
	};

	const arr: BaseSchema.PrivateChats = [
		{
			chatId: "1",
			createdAt: 123123123,
			messages: [
				{
					createdAt: 123123,
					messageId: "123123",
					messageText: "Hello",
					sender: { senderId: userInfo.userId },
				},
			],
			participants: [{ participantId: "123123" }],
		},
		{
			chatId: "2",
			createdAt: 123123123,
			messages: [
				{
					createdAt: 123123,
					messageId: "123123",
					messageText: "Hello",
					sender: { senderId: userInfo.userId },
				},
			],
			participants: [{ participantId: "123123" }],
		},
		{
			chatId: "a",
			createdAt: 123123123,
			messages: [
				{
					createdAt: 123123,
					messageId: "123123",
					messageText: "Hello",
					sender: { senderId: userInfo.userId },
				},
			],
			participants: [{ participantId: "123123" }],
		},
		{
			chatId: "b",
			createdAt: 123123123,
			messages: [
				{
					createdAt: 123123,
					messageId: "123123",
					messageText: "Hello",
					sender: { senderId: userInfo.userId },
				},
			],
			participants: [{ participantId: "123123" }],
		},
		{
			chatId: "c",
			createdAt: 123123123,
			messages: [
				{
					createdAt: 123123,
					messageId: "123123",
					messageText: "Hello",
					sender: { senderId: userInfo.userId },
				},
			],
			participants: [{ participantId: "123123" }],
		},
	];

	return (
		<List className="flex flex-col h-full w-full gap-2 overflow-y-auto scroll-smooth ">
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
