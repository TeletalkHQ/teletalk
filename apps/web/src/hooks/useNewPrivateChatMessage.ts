import { useMessageStore } from "~/store";

import { useAddPrivateChat } from "./useAddPrivateChat";
import { useListener } from "./useListener";

export const useNewPrivateChatMessage = () => {
  const messageStore = useMessageStore();
  const { handler: privateChatUpdater } = useAddPrivateChat();

  useListener({
    evName: "sendMessage",
    cb: async (response) => {
      if (
        messageStore.privateChats.some((i) => i.chatId === response.data.chatId)
      )
        messageStore.addMessage(response.data);
      else privateChatUpdater(response.data.chatId);
    },
  });
};
