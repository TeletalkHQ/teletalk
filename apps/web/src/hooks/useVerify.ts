import { domUtils } from "~/classes/DomUtils";
import { storage } from "~/classes/Storage";
import { websocket } from "~/classes/websocket/Websocket";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useVerify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler: verifyHandler, loading } = useEmitter("verify");

  const handler = () => {
    verifyHandler.emitFull(
      {
        verificationCode: authStore.verificationCode,
      },
      ({ data }) => {
        authStore.updateVerificationCode("");

        if (data.newUser) router.replace("create");
        else {
          storage.set("session", data.session);
          websocket.updateSession(data.session);
          router.push("messenger");
        }
      },
      () => {
        domUtils()
          .setElementByName("verificationCode")
          .focusElement()
          .selectAllValue();
      }
    );
  };

  return {
    loading,
    handler,
  };
};
