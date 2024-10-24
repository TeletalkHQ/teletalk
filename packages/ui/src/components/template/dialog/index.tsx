import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { DialogStore, useDialogStore } from "@repo/store";
import { VoidNoArgs } from "@repo/types";
import React from "react";

import { TransitionName, configManager } from "../../../../../classes/src";
import { Box, DialogProps, Transitions } from "../../base";
import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

type FilteredDialogProps = Omit<DialogProps, "content" | "title" | "open">;

type Props = FilteredDialogProps & {
	actions: JSX.Element | null;
	content: JSX.Element | null;
	dialogState: DialogStore.DialogTemplateData;
	dialogStyle?: React.CSSProperties;
	fullHeight?: boolean;
	isClosable?: boolean;
	onAfterClose?: VoidNoArgs;
	onClose?: VoidNoArgs;
	onKeyDown?: VoidNoArgs;
	paperStyle?: React.CSSProperties;
	title?: string | JSX.Element;
	transitionDuration?: number;
	transitionName?: TransitionName;
};

export const DialogTemplate: React.FC<Props> = ({
	actions,
	content,
	dialogState,
	dialogStyle,
	fullHeight,
	fullScreen,
	isClosable = true,
	onAfterClose,
	onClose,
	paperStyle,
	title,
	transitionDuration,
	transitionName = configManager.getConfigs().UI.DIALOG_DEFAULT_TRANSITION,
	...rest
}) => {
	const dialogStore = useDialogStore();

	const theme = useTheme();

	const smFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const FoundTransition =
		Transitions[transitionName] ||
		Transitions[configManager.getConfigs().UI.DIALOG_DEFAULT_TRANSITION];

	const handleClose = () => {
		const oc = onClose || dialogStore.setCloseAllDialog;
		oc();
		onAfterClose?.();
	};

	const paperHeight = smFullScreen
		? "100vh"
		: fullHeight
			? "100%"
			: paperStyle?.height;

	return (
		<Box.Dialog
			{...rest}
			fullScreen={fullScreen || smFullScreen}
			keepMounted
			{...{
				onClose: isClosable ? handleClose : undefined,
			}}
			open={dialogState.isOpen}
			PaperProps={{
				style: {
					...paperStyle,
					height: paperHeight,
				},
			}}
			sx={{
				zIndex: dialogState.props.zIndex,
				...dialogStyle,
			}}
			TransitionComponent={FoundTransition}
			transitionDuration={transitionDuration || 500}
		>
			<Title>{title}</Title>
			<Content>{content}</Content>
			<Actions>{actions}</Actions>
		</Box.Dialog>
	);
};
