import { useEffect } from "react";

import { useMessageStore, useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";

export const useSetPrivateChats = () => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();
  const { handler: getPrivateChatsHandler } = useEmitter("getPrivateChats");
  useEffect(() => {
    if (userStore.currentUserData.userId) handler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.currentUserData.userId]);

  const handler = () => {
    getPrivateChatsHandler.emitFull({}, ({ data }) => {
      messageStore.setPrivateChats(data.privateChats);
    });
  };

  return {
    handler,
  };
};
