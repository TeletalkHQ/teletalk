import { enqueueSnackbar } from "notistack";

import { NotificationReason } from "~/types";

import { notificationStore } from "./NotificationStore";

export class NotificationManager {
  printError(reason: NotificationReason) {
    enqueueSnackbar(notificationStore.find(reason).message, {
      variant: "error",
    });
  }

  printSuccess(reason: NotificationReason) {
    enqueueSnackbar(notificationStore.find(reason).message, {
      variant: "success",
    });
  }
}

export const notificationManager = new NotificationManager();
