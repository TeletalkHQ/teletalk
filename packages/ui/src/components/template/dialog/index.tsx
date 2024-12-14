"use client";

import type { ModalProps, PaperProps } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useConfigs } from "@repo/hooks/useConfigs";
import type { DialogStore } from "@repo/store";
import { useDialogStore } from "@repo/store";
import { type TransitionName, type VoidNoArgs } from "@repo/types";
import { type JSX } from "react";

import { Dialog, type DialogProps } from "../../box/dialog";
import { Transitions } from "../../transition";
import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

type Props = {
	actions: JSX.Element | null;
	content: JSX.Element | null;
	dialogProps?: Omit<DialogProps, "content" | "title" | "open">;
	dialogState: DialogStore.DialogTemplateData;
	fullHeight?: boolean;
	isClosable?: boolean;
	onAfterClose?: VoidNoArgs;
	onClose?: VoidNoArgs;
	onKeyDown?: VoidNoArgs;
	paperProps?: PaperProps;
	title?: string | JSX.Element;
	transitionDuration?: number;
	transitionName?: TransitionName;
};

export const DialogTemplate: React.FC<Props> = ({
	actions,
	content,
	dialogProps,
	dialogState,
	fullHeight,
	isClosable = true,
	onAfterClose,
	onClose,
	title,
	transitionDuration,
	transitionName,
	paperProps,
	...rest
}) => {
	const dialogStore = useDialogStore();

	const { configs } = useConfigs();

	const theme = useTheme();

	const smFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const SelectedTransition =
		Transitions[transitionName || configs.ui.dialogDefaultTransition];

	const handleClose: ModalProps["onClose"] = (_e, reason) => {
		const onCloseByDialogState =
			reason === "backdropClick"
				? dialogStore.setCloseAllDialog
				: dialogState.close;

		const oc = onClose || onCloseByDialogState;

		oc();
		onAfterClose?.();
	};

	const paperHeight = smFullScreen
		? "100vh"
		: fullHeight
			? "100%"
			: paperProps?.style?.height;

	return (
		<Dialog
			{...rest}
			fullScreen={dialogProps?.fullScreen || smFullScreen}
			keepMounted
			open={dialogState.isOpen}
			PaperProps={{
				className: paperProps?.className || "w-full max-w-sm",
				...paperProps,
				style: {
					...paperProps?.style,
					height: paperHeight,
				},
			}}
			sx={{
				zIndex: dialogState.props.zIndex,
				...dialogProps?.sx,
			}}
			TransitionComponent={SelectedTransition}
			transitionDuration={transitionDuration || 500}
			onClose={isClosable ? handleClose : undefined}
		>
			<Title>{title}</Title>
			<Content>{content}</Content>
			<Actions>{actions}</Actions>
		</Dialog>
	);
};
