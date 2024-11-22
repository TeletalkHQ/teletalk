import { GlobalStore, useGlobalStore } from "~/store";

export const useContextMenu = (list: GlobalStore.ContextMenuList) => {
	const globalStore = useGlobalStore();

	const handleOpenContextMenu = (
		e: React.MouseEvent,
		l?: GlobalStore.ContextMenuList
	) => {
		globalStore.handleContextMenu(e, l || list);
	};

	return {
		onContextMenu: handleOpenContextMenu,
	};
};
