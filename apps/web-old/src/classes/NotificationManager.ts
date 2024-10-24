import { errorStore } from "@repo/error-store";
import { enqueueSnackbar } from "notistack";

import { NotificationReason } from "~/types";

export class NotificationManager {
	printError(reason: NotificationReason) {
		enqueueSnackbar(errorStore.find(reason).message, {
			variant: "error",
		});
	}

	printSuccess(reason: NotificationReason) {
		enqueueSnackbar(errorStore.find(reason).message, {
			variant: "success",
		});
	}
}

export const notificationManager = new NotificationManager();
