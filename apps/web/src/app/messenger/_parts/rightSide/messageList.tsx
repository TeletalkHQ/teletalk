import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";

import { MessageListItem } from "./messageListItem";

interface Props {}

export const MessageList: React.FC<Props> = () => {
	// TODO: Handle scroll to bottom
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		//CLEANME: Don't use null assertions
	// 		const messageBox = domUtils().getElementById("messageBox")!;
	// 		messageBox.scrollTo({
	// 			top: messageBox.scrollHeight,
	// 		});
	// 	}, 100);
	// }, [messageStore.privateChats]);

	// const selectedChatId = useChatStore((state) => state.selectedChatId);

	const {
		data: { userInfo },
	} = useUserInfo();

	const messages: BaseSchema.Messages = [];

	return (
		<Div
			id="messageBox"
			style={{
				height: "100%",
				overflowY: "auto",
				padding: 5,
				scrollBehavior: "smooth",
				width: "100%",
			}}
		>
			{messages.map((messageItem, index: number) => {
				return (
					//TODO: Update message time and chat date
					<MessageListItem
						key={index}
						chatDate=""
						justify={
							userInfo.userId === messageItem.sender.senderId
								? "flex-end"
								: "flex-start"
						}
						message={messageItem.messageText}
						messageTime={messageItem.createdAt.toString()}
					/>
				);
			})}
		</Div>
	);
};
