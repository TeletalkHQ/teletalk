"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";
import { useState } from "react";

import { Content } from "./content";
import type { SortType } from "./title";
import { Title } from "./title";

export const Contacts = () => {
	const addContactDialog = useDialogState("addContactByPhone");

	const [sortType, setSortType] = useState<SortType>("a-z");

	const dialogState = useDialogState("contacts");

	const toggleSortType = () => {
		const sortNextValue: Record<SortType, SortType> = {
			"a-z": "time",
			time: "a-z",
		};

		setSortType(sortNextValue[sortType]);
	};

	return (
		<DialogTemplate
			actions={
				<DoubleAction
					leftButtonProps={{
						onClick: dialogState.close,
					}}
					leftButtonText="Close"
					rightButtonProps={{
						onClick: () => addContactDialog.open(),
					}}
					rightButtonText="Add Contact"
				/>
			}
			content={<Content />}
			dialogState={dialogState}
			paperProps={{ className: "w-full max-w-md" }}
			title={<Title sortType={sortType} toggleSortType={toggleSortType} />}
		/>
	);
};
