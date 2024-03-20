import { Divider, SwipeableDrawer } from "@mui/material";
import { KeyboardEvent, SyntheticEvent } from "react";

import { userUtils } from "~/classes/UserUtils";
import { Box } from "~/components";
import { useGlobalStore, useUserStore } from "~/store";
import { dialogNames } from "~/store/global/initialState";
import { DialogName, ElementName } from "~/types";
import { utils } from "~/utils";

import DrawerList from "./DrawerList";
import PersonalData from "./PersonalData";

const Drawer = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();

  const toggleDrawer = (
    event: SyntheticEvent<{}, Event> | KeyboardEvent<HTMLDivElement>,
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
      globalStore.openDialog(n as DialogName);
  };

  const fullName = userUtils.concatFirstNameWithLastName(
    userStore.currentUserData
  );
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(
    userStore.currentUserData
  );

  return (
    <SwipeableDrawer
      anchor={globalStore.drawer.anchor}
      disableBackdropTransition={!utils.isIos()}
      disableDiscovery={utils.isIos()}
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
        <PersonalData
          avatarSrc={userStore.currentUserData.avatarSrc}
          fullName={fullName}
          fullNumber={fullNumber}
        />

        <Divider />

        <DrawerList
          toggleDrawer={toggleDrawer}
          onClick={handleDrawerItemClick}
        />
      </Box.Div>
    </SwipeableDrawer>
  );
};

export default Drawer;
