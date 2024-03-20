import { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import { Template } from "~/components";
import { events } from "~/events";
import { useDialogState, usePing, useStore } from "~/hooks";
import "~/hooks";
import { Url } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content/Content";

const ServerSetup = () => {
  const stores = useStore();
  const dialogState = useDialogState("serverSetup");
  const [selectedServer, setSelectedServer] = useState<Url>(
    appConfigs.getConfigs().api.selectedServerUrl
  );
  const { loading: pingLoading, handler: pinger, status } = usePing();

  useEffect(() => {
    stores.global.openDialog("serverSetup");
    handleSetup();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServer]);

  const handleSetup = async () => {
    stores.global.updateIsInitialized(false);
    const { status } = await pinger(selectedServer);
    if (status === "online") {
      utils.registerWindowCustomProperties();
      appConfigs.updateSelectedServer(selectedServer);
      events.websocket.otherEvents();
      stores.global.closeDialog();

      stores.auth.reset();
      stores.message.reset();
      stores.settings.reset();
      stores.user.reset();

      stores.global.updateIsInitialized(true);

      websocket.setAndInitialize({
        url: selectedServer,
      });
      websocket.client.connect();
    }
  };

  const handleServersClick = () => {
    stores.global.openDialog("servers");
  };

  const handleServerSelectChange = (url: Url) => {
    setSelectedServer(url);
    handleSetup();
  };

  const handleAddServerClick = () => {
    stores.global.openDialog("addServer");
  };

  const isPending = status === "pending";
  const isGloballyDisabled = isPending || pingLoading;

  return (
    <>
      <Template.Dialog
        actions={
          <Actions
            disabled={isGloballyDisabled}
            loading={pingLoading}
            status={status}
            onSetup={handleSetup}
          />
        }
        content={
          <Content
            disabled={isGloballyDisabled}
            selectedServer={selectedServer}
            status={status}
            onAddServerClick={handleAddServerClick}
            onServersClick={handleServersClick}
            onServerSelectChange={handleServerSelectChange}
          />
        }
        isClosable={false}
        open={dialogState.open}
      />
    </>
  );
};

export default ServerSetup;
