import { Notification } from "~/types";

interface _PartialNotification extends Partial<Notification> {
	isAuthError: Notification["isAuthError"];
	reason: Notification["reason"];
	side: Notification["side"];
}

export class NotificationBuilder {}

export const notificationBuilder = () => new NotificationBuilder();
