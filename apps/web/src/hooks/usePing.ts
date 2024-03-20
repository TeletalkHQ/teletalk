import Timeout from "await-timeout";
import { useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import { ServerTestResult, Status, Url } from "~/types";

import { useEmitter } from "./useEmitter";

export const usePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const { handler: pingHandler } = useEmitter("ping");

  const handler = async (url: Url) => {
    setLoading(true);
    setStatus("pending");

    await Timeout.set(appConfigs.getConfigs().api.defaultTimeout);

    return new Promise<ServerTestResult>((resolve) => {
      setWebsocketClient(url);

      websocket.client.on("connect", async () => {
        await emitPingEvent();
        const endTime = Date.now();
        resolve({
          ping: endTime - startTime,
          status: "online",
          url,
        });
        websocket.client.disconnect();
      });

      websocket.client.on("connect_error", () => {
        handleSettled("offline");
        resolve({
          ping: -1,
          status: "offline",
          url,
        });
        websocket.client.disconnect();
      });

      const startTime = Date.now();

      websocket.client.connect();
    });
  };

  const setWebsocketClient = (url: Url) => {
    websocket.client?.removeAllListeners();
    websocket.client?.disconnect();

    const client = websocket.initialize({
      url,
    });
    websocket.setClient(client);
  };

  const emitPingEvent = () => {
    return pingHandler.emitFull({}, successPingCallback, failPingCallback, {
      timeout: 0,
    });
  };

  const successPingCallback = () => {
    handleSettled("online");
  };

  const failPingCallback = () => {
    handleSettled("offline");
  };

  const handleSettled = (status: Status) => {
    setStatus(status);
    setLoading(false);
  };

  return {
    loading,
    handler,
    setStatus,
    status,
  };
};
