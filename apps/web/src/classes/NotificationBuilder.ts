import { Notification, NotificationReason, NotificationSide } from "~/types";

interface PartialNotification extends Partial<Notification> {
  isAuthError: boolean;
  reason: NotificationReason;
  side: NotificationSide;
}

export class NotificationBuilder {
  private notification: PartialNotification = {
    isAuthError: false,
    reason: "UNKNOWN_ERROR",
    side: "CLIENT",
  };

  build() {
    return {
      message: `MESSAGE: ${this.notification.reason}`,
      description: `DESCRIPTION: ${this.notification.reason}`,
      ...this.notification,
    };
  }

  description(description: string) {
    this.notification.description = description;
    return this;
  }

  message(message: string) {
    this.notification.message = message;
    return this;
  }

  reason(reason: NotificationReason) {
    this.notification.reason = reason;
    return this;
  }

  isAuthError(isAuthError = true) {
    this.notification.isAuthError = isAuthError;
    return this;
  }

  side(side: NotificationSide) {
    this.notification.side = side;
    return this;
  }
}

export const notificationBuilder = () => new NotificationBuilder();
