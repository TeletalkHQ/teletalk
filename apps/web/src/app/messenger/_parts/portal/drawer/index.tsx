import type { DialogStore } from "@repo/store";
import { dialogNames, useDialogStore } from "@repo/store";
import { Div } from "@repo/ui/box/div";
import { Divider } from "@repo/ui/box/divider";
import { SwipeableDrawer } from "@repo/ui/box/swipeableDrawer";
import { type ElementName } from "@repo/ui/types";
import { type KeyboardEvent, type SyntheticEvent } from "react";

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

		globalStore.updateIsDrawerOpen(open);
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
			className="m-4"
			open={globalStore.drawer.open}
			PaperProps={{ className: "h-[97vh] m-[17px] rounded-lg" }}
			onClose={(event) => toggleDrawer(event, false)}
			onOpen={(event) => toggleDrawer(event, true)}
		>
			<Div
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
			</Div>
		</SwipeableDrawer>
	);
};
