"use client";

import { useConfigs } from "@repo/hooks/useConfigs";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useLoading } from "@repo/hooks/useLoading";
import { type ServerTestResult, usePing } from "@repo/hooks/usePing";
import { DialogTemplate } from "@repo/ui/template/dialog";
import merge from "lodash/merge";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

export const Servers = () => {
	const dialogState = useDialogState("servers");
	const list = useRef<Array<ServerTestResult & { id: number }>>([]);
	const [forceUpdate, setForceUpdate] = useState(false);

	const { configs } = useConfigs();

	const { isLoading, startLoading, finishLoading } = useLoading();
	const {
		handlers: { pinger },
	} = usePing();

	useEffect(() => {
		handleForceUpdate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		if (dialogState.isOpen) handleResetList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogState.isOpen]);

	const handleResetList = () => {
		list.current = configs.api.servers.map((item) => ({
			ping: -1,
			status: "idle",
			url: item.url,
			id: item.id,
		}));
		handleForceUpdate();
	};

	const handleForceUpdate = () => {
		setForceUpdate(!forceUpdate);
	};

	const handlePingAllServers = async () => {
		startLoading();

		handleResetList();

		for (const item of list.current) {
			await handlePingOneServer(item.id);
		}

		finishLoading();
	};

	const handleServerItemClick = async (id: number) => {
		startLoading();
		await handlePingOneServer(id);
		finishLoading();
	};

	const handlePingOneServer = async (id: number) => {
		updateServer(id, { status: "pending" });

		const foundServer = configs.api.servers.find((item) => item.id === id);

		if (!foundServer) return toast.error("SERVER_NOT_FOUND");

		const result = await pinger(foundServer.url);
		updateServer(id, result);
	};

	const updateServer = (
		id: number,
		restResult: Partial<Omit<ServerTestResult, "url">> = {}
	) => {
		const item = list.current.find((i) => i.id === id);

		if (item) merge(item, restResult);
	};

	const handleClose = () => {
		dialogState.close();
	};

	const isPinging = list.current.some((item) => item.status === "pending");

	return (
		<DialogTemplate
			actions={
				<Actions isLoading={isPinging} onPingAllClick={handlePingAllServers} />
			}
			content={
				<Content
					disabled={isPinging}
					list={list.current}
					onListItemClick={handleServerItemClick}
				/>
			}
			dialogState={dialogState}
			title={<Title />}
			onClose={handleClose}
		/>
	);
};
