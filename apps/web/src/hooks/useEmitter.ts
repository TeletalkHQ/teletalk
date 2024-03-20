import type { EventName, IOCollection } from "teletalk-type-store";

import { storage } from "~/classes/Storage";
import { stuffStore } from "~/classes/StuffStore";
import { eventHandler } from "~/classes/websocket/EventHandler";
import { SocketRoute } from "~/types";

import { useCustomRouter } from "./useCustomRouter";
import { useLoading } from "./useLoading";

export const useEmitter = <EvName extends EventName>(evName: EvName) => {
  const { loading, updateLoading } = useLoading();
  const router = useCustomRouter();

  const handleAuthError = () => {
    storage.remove("session");
    router.push("signIn");
  };

  type IOType = IOCollection[EvName];

  const handler = eventHandler<IOType>(updateLoading, handleAuthError).setRoute(
    stuffStore.events.find((i) => i.name === evName) as SocketRoute
  );

  return {
    handler,
    loading,
  };
};
