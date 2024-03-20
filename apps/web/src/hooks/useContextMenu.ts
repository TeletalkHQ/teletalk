import { useGlobalStore } from "~/store";
import { ContextMenuList } from "~/types";

export const useContextMenu = (list: ContextMenuList) => {
  const globalStore = useGlobalStore();

  const handleOpenContextMenu = (e: React.MouseEvent, l?: ContextMenuList) => {
    globalStore.handleContextMenu(e, l || list);
  };

  return {
    onContextMenu: handleOpenContextMenu,
  };
};
