"use client";

import { type Protocol, type Url, useConfigs } from "@repo/hooks/useConfigs";
import { useDialogState } from "@repo/hooks/useDialogState";
import { usePing } from "@repo/hooks/usePing";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { type OnInputChange, type OnSelectOnChange } from "@repo/ui/types";
import { useApiPhase } from "@repo/use-api";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

export const AddServer = () => {
	const dialogState = useDialogState("addServer");
	const [inputValue, setInputValue] = useState("");
	const [protocol, setProtocol] = useState<Protocol>("https");
	const {
		data: { testResult },
		handlers: { pinger, updateStatus },
	} = usePing();

	const pingPhase = useApiPhase("ping");

	const { configs, addServerUrl } = useConfigs();

	const handleInputChange: OnInputChange = (event) => {
		setInputValue(event.target.value);
		updateStatus("idle");
	};

	const handleAddClick = () => {
		if (configs.api.servers.some((i) => i.url === getServerUrl()))
			toast.error("SERVER_ALREADY_EXIST");
		else {
			addServerUrl(getServerUrl());
			dialogState.close();
			handleReset();
		}
	};

	const getServerUrl = (): Url => {
		return `${protocol}://${inputValue}`;
	};

	const handleReset = () => {
		setInputValue("");
		updateStatus("idle");
	};

	const handleSelectChange: OnSelectOnChange = (e) => {
		setProtocol(e.target.value as Protocol);
		updateStatus("idle");
	};

	const handleTestClick = () => {
		pinger(getServerUrl());
	};

	const isPending = testResult.status === "pending";
	const isAddDisabled =
		isPending || !inputValue || testResult.status !== "online";
	const isTestDisabled = isPending || !inputValue;
	const isCloseDisabled = isPending;
	const isInputsDisabled = isPending;

	return (
		<DialogTemplate
			actions={
				<Actions
					isAddDisabled={isAddDisabled}
					isCloseDisabled={isCloseDisabled}
					isLoading={pingPhase.isLoading}
					isTestDisabled={isTestDisabled}
					onAddClick={handleAddClick}
					onClose={dialogState.close}
					onTestClick={handleTestClick}
				/>
			}
			content={
				<Content
					disabled={isInputsDisabled}
					inputValue={inputValue}
					protocol={protocol}
					status={testResult.status}
					onChange={handleInputChange}
					onSelectChange={handleSelectChange}
				/>
			}
			dialogState={dialogState}
			title={<Title />}
		/>
	);
};
