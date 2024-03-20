import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

import { useGlobalStore } from "~/store";

export default function ContextMenu() {
  const globalStore = useGlobalStore();

  const handleClose = () => {
    globalStore.closeContextMenu();
  };

  return (
    <Menu
      anchorPosition={
        globalStore.contextMenu.position !== null
          ? {
              top: globalStore.contextMenu.position.mouseY,
              left: globalStore.contextMenu.position.mouseX,
            }
          : undefined
      }
      anchorReference="anchorPosition"
      open={globalStore.contextMenu.position !== null}
      onClose={handleClose}
    >
      {globalStore.contextMenu.list.map((item, index) => (
        <MenuItem key={index} onClick={item.handler}>
          {item.text}
        </MenuItem>
      ))}
    </Menu>
  );
}
