import { useEffect } from "react";
import type { PrivateChats, UserId } from "teletalk-type-store";

import { domUtils } from "~/classes/DomUtils";
import { Box } from "~/components";
import MessageListItem from "~/containers/Messenger/RightSide/MessageListItem";
import { useMessageStore, useUserStore } from "~/store";

interface Props {}

const MessageList: React.FC<Props> = () => {
  const userStore = useUserStore();
  const messageStore = useMessageStore();

  useEffect(() => {
    setTimeout(() => {
      const messageBox = domUtils().getElementById("messageBox")!;
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
      });
    }, 100);
  }, [messageStore.privateChats]);

  const selectedChatId =
    messageStore.selectedChatInfo.chatId ||
    findChatId(messageStore.privateChats, messageStore.selectedChatInfo.userId);

  const messages =
    messageStore.privateChats.find((i) => i.chatId === selectedChatId)
      ?.messages || [];

  return (
    <Box.Div
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
          <MessageListItem
            chatDate=""
            message={messageItem.messageText}
            key={index}
            //TODO: Update message time and chat date
            messageTime={"" ?? messageItem.createdAt.toString()}
            justify={
              userStore.currentUserData.userId === messageItem.sender.senderId
                ? "flex-end"
                : "flex-start"
            }
            // transitionDirection={
            //   currentUserId === messageItem.sender.senderId ? "left" : "right"
            // }
          />
        );
      })}
    </Box.Div>
  );
};

export default MessageList;

const findChatId = (p: PrivateChats, selectedUserId: UserId) =>
  p.find((i) => i.participants.find((j) => j.participantId === selectedUserId))
    ?.chatId || "";
