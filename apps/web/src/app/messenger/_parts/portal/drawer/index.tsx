import { Divider, SwipeableDrawer } from "@mui/material";
import { DialogStore, dialogNames, useDialogStore } from "@repo/store";
import { Box, ElementName } from "@repo/ui";
import { KeyboardEvent, SyntheticEvent } from "react";

import { useGlobalStore } from "~/store";

import { DrawerList } from "./drawerList";
import { PersonalData } from "./personalData";

export const Drawer = () => {
	const globalStore = useGlobalStore();

	const { openDialog } = useDialogStore((state) => ({
		openDialog: state.setOpenDialog,
	}));

	const toggleDrawer = (
		event: SyntheticEvent<object, Event> | KeyboardEvent<HTMLDivElement>,
		open: boolean
	) => {
		if (
			event?.type === "keydown" &&
			(("key" in event && event.key === "Tab") ||
				("key" in event && event.key === "Shift"))
		) {
			return;
		}

		globalStore.changeDrawerOpen(open);
	};

	const handleDrawerItemClick = (n: ElementName) => {
		if (dialogNames.some((i) => i === n))
			openDialog(n as DialogStore.DialogName);
	};

	return (
		<SwipeableDrawer
			anchor={globalStore.drawer.anchor}
			// disableBackdropTransition={!utils.isIos()}
			// disableDiscovery={utils.isIos()}
			open={globalStore.drawer.open}
			onClose={(event) => toggleDrawer(event, false)}
			onOpen={(event) => toggleDrawer(event, true)}
		>
			<Box.Div
				role="presentation"
				style={{
					width:
						globalStore.drawer.anchor === "top" ||
						globalStore.drawer.anchor === "bottom"
							? "auto"
							: 250,
				}}
				onKeyDown={(event) => toggleDrawer(event, false)}
			>
				<PersonalData />

				<Divider />

				<DrawerList
					toggleDrawer={toggleDrawer}
					onClick={handleDrawerItemClick}
				/>
			</Box.Div>
		</SwipeableDrawer>
	);
};
