"use client";

import { useConfigs } from "@repo/hooks/useConfigs";
import { useDialogState } from "@repo/hooks/useDialogState";
import { usePing } from "@repo/hooks/usePing";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { useApiPhase } from "@repo/use-api";
import isNumber from "lodash/isNumber";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useGlobalStore } from "~/store/global";

import { Actions } from "./actions";
import { Content } from "./content";

const useSelectedServer = () => {
	const { configs } = useConfigs();

	const foundServer = configs.api.servers.find(
		(item) => item.id === configs.api.selectedServerId
	);

	return foundServer;
};

export const ServerSetup = () => {
	const { configs, updateSelectedServer } = useConfigs();

	const selectedServer = useSelectedServer();

	const [serverId, setServerId] = useState<number | undefined>(
		selectedServer?.id
	);

	const pingPhase = useApiPhase("ping");

	const globalStore = useGlobalStore();

	const serverSetupDialog = useDialogState("serverSetup");
	const serversDialog = useDialogState("servers");
	const addServerDialog = useDialogState("addServer");

	const {
		data: { testResult },
		handlers: { pinger },
	} = usePing();

	useEffect(() => {
		serverSetupDialog.open();
		if (isNumber(serverId)) {
			handleSetup();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serverId]);

	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.key?.toLowerCase() === "y" && e.ctrlKey) serverSetupDialog.open();
		};

		window.removeEventListener("keydown", listener);
		window.addEventListener("keydown", listener);
	}, [serverSetupDialog]);

	const handleSetup = async () => {
		if (!serverId) return toast.error("SERVER_ID_NOT_SET");

		const foundServer = configs.api.servers.find(
			(item) => item.id === serverId
		);

		if (!foundServer) return toast.error("SERVER_NOT_FOUND");

		globalStore.updateIsInitialized(false);

		const { status } = await pinger(foundServer.url);

		if (status === "online") {
			updateSelectedServer(serverId);

			serverSetupDialog.close();

			// TODO: ?
			// stores.auth.reset();
			// stores.message.reset();
			// stores.settings.reset();
			// stores.user.reset();

			globalStore.updateIsInitialized(true);
		}
	};

	const handleServerSelectChange = (id: number) => {
		setServerId(id);
		handleSetup();
	};

	const isPending = testResult.status === "pending";
	const isGloballyDisabled = isPending || pingPhase.isLoading;
	const isClosable = testResult.status === "online";

	return (
		<>
			<DialogTemplate
				actions={
					<Actions
						disabled={isGloballyDisabled}
						isLoading={pingPhase.isLoading}
						status={testResult.status}
						onSetup={handleSetup}
					/>
				}
				content={
					<Content
						disabled={isGloballyDisabled}
						selectedServerId={serverId}
						status={testResult.status}
						onAddServerClick={addServerDialog.open}
						onServersClick={serversDialog.open}
						onServerSelectChange={handleServerSelectChange}
					/>
				}
				dialogState={serverSetupDialog}
				isClosable={isClosable}
			/>
		</>
	);
};
