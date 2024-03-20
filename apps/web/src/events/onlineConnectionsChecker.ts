//@ts-nocheck
import { windowUtilities } from "~/classes/WindowUtilities";

const onlineStatusOnChangeEvent = (dispatch) => {
  const isOnline = windowUtilities.isOnline();
  dispatch(actions.onlineStatusChange({ isOnline }));
};

const addOnlineStatusOnChangeListener = (type, dispatch) =>
  window.addEventListener(type, () => onlineStatusOnChangeEvent(dispatch));

const removeOnlineStatusOnChangeListener = (type, dispatch) =>
  window.removeEventListener(type, () => onlineStatusOnChangeEvent(dispatch));

export const addOnlineStatusEvents = (dispatch) => {
  removeOnlineStatusOnChangeListener("offline", dispatch);
  removeOnlineStatusOnChangeListener("online", dispatch);

  addOnlineStatusOnChangeListener("offline", dispatch);
  addOnlineStatusOnChangeListener("online", dispatch);
};
