import type { PrivateChatItem, UserId } from "teletalk-type-store";

import { useMessageStore, useUserStore } from "~/store";
import { SelectedChatInfo } from "~/types";

import ChatListItem from "./ChatListItem";
import { HandleChatListItemClick } from "./types";

interface Props {
  onChatListItemClick: HandleChatListItemClick;
  selectedUserToChat: SelectedChatInfo;
}

const ChatList: React.FC<Props> = ({
  onChatListItemClick,
  selectedUserToChat,
}) => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  return (
    <>
      {messageStore.privateChats.map((p, index) => {
        const targetUserId = findTargetUserId(
          p,
          userStore.currentUserData.userId
        );
        const lastMessage = getLastMessage(p);

        return (
          <ChatListItem
            key={index}
            messageText={lastMessage.messageText}
            selected={selectedUserToChat.userId === targetUserId}
            userId={targetUserId}
            onClick={() =>
              onChatListItemClick({
                chatId: p.chatId,
                userId: targetUserId,
              })
            }
          />
        );
      })}
    </>
  );
};

export default ChatList;

const findTargetUserId = (p: PrivateChatItem, userId: UserId) => {
  return (
    p.participants.find((participant) => participant.participantId !== userId)
      ?.participantId || ""
  );
};

const getLastMessage = (p: PrivateChatItem) => p.messages.at(-1)!;
