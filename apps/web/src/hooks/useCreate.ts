import { extractor } from "~/classes/Extractor";
import { storage } from "~/classes/Storage";
import { websocket } from "~/classes/websocket/Websocket";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useCreate = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler: createHandler, loading } = useEmitter("createNewUser");

  const handler = async () => {
    createHandler.emitFull(extractor.fullName(authStore), ({ data }) => {
      authStore.updateFirstName("");
      authStore.updateLastName("");

      storage.set("session", data.session);
      websocket.updateSession(data.session);

      router.push("messenger");
    });
  };

  return {
    handler,
    loading,
  };
};
