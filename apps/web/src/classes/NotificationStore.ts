import { Notification, NotificationReason } from "~/types";
import { variables } from "~/variables";

import { notificationBuilder } from "./NotificationBuilder";
import { stuffStore } from "./StuffStore";

class NotificationStore {
  private notifications = [
    ...stuffStore.errors,
    ...variables.notifications.errors.customErrors,
  ].map((item) => {
    return notificationBuilder()
      .reason(item.reason)
      .isAuthError(item.isAuthError)
      .side(item.side)
      .build();
  });

  find(reason: NotificationReason): Notification {
    return this.notifications.find((i) => i.reason === reason)!;
  }

  getAll() {
    return this.notifications;
  }
}

export const notificationStore = new NotificationStore();
