import {
	Protocol,
	Url,
	useConfigs,
	useDialogState,
	usePing,
} from "@repo/hooks";
import { DialogTemplate, OnInputChange, OnSelectOnChange } from "@repo/ui";
import { useApiPhase } from "@repo/use-api";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

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
			enqueueSnackbar({ message: "SERVER_ALREADY_EXIST", variant: "error" });
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
