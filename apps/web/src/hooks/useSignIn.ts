import { extractor } from "~/classes/Extractor";
import { storage } from "~/classes/Storage";
import { websocket } from "~/classes/websocket/Websocket";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useSignIn = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler: signInHandler, loading } = useEmitter("signIn");

  const handler = () => {
    signInHandler.emitFull(
      extractor.unknownCellphone(authStore),
      ({ data }) => {
        storage.set("session", data.session);
        websocket.updateSession(data.session);

        router.push("verify");
      },
      (errors) => {
        console.error(errors);
      }
    );
  };

  return {
    loading,
    handler,
  };
};
