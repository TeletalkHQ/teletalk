import { GlobalHandlers, GlobalSetState } from "~/types";

import { defaultDialogState, initialState } from "./initialState";

export const handlers: (set: GlobalSetState) => GlobalHandlers = (set) => ({
  openLoading(type) {
    set((prevState) => {
      return {
        loading: {
          ...prevState.loading,
          open: true,
          type: type || prevState.loading.type,
        },
      };
    });
  },
  closeLoading(type) {
    set((prevState) => {
      return {
        loading: {
          ...prevState.loading,
          open: false,
          type: type || prevState.loading.type,
        },
      };
    });
  },

  openOverlayLoading() {
    this.openLoading("OVERLAY");
  },
  closeOverlayLoading() {
    this.closeLoading("OVERLAY");
  },

  openFullPageLoading() {
    this.openLoading("FULL_PAGE");
  },
  closeFullPageLoading() {
    this.closeLoading("FULL_PAGE");
  },

  changeDrawerOpen(open) {
    set((prevState) => {
      return {
        drawer: {
          ...prevState.drawer,
          open,
        },
      };
    });
  },

  updateIsInitialized(isInitialized) {
    set({
      isInitialized,
    });
  },

  updateOnlineStatus(isOnline) {
    set({
      isOnline,
    });
  },

  openDialog(dialogName, props = defaultDialogState.props) {
    set((prevState) => ({
      dialogStates: [
        ...prevState.dialogStates,
        {
          name: dialogName,
          open: true,
          props,
        },
      ],
    }));
  },

  closeDialog() {
    set((prevState) => {
      const newDialogStates = [...prevState.dialogStates];
      newDialogStates.pop();

      return {
        dialogStates: newDialogStates,
      };
    });
  },

  closeAllDialog() {
    set(() => ({
      dialogStates: [],
    }));
  },

  handleContextMenu(e: React.MouseEvent, list) {
    e.preventDefault();

    set((prevState) => ({
      contextMenu:
        prevState.contextMenu.position === null
          ? {
              list,
              position: {
                mouseX: e.clientX + 2,
                mouseY: e.clientY - 6,
              },
            }
          : {
              list: [],
              position: null,
            },
    }));
  },

  updateContextMenuList(list) {
    set((prevState) => ({
      contextMenu: {
        ...prevState.contextMenu,
        list,
      },
    }));
  },

  closeContextMenu() {
    set((prevState) => ({
      contextMenu: {
        ...prevState.contextMenu,
        position: null,
      },
    }));
  },

  reset() {
    set(initialState);
  },
});
