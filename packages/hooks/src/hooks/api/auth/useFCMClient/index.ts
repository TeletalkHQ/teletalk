import { logger } from "@repo/logger";
import { getToken, isSupported, onMessage } from "firebase/messaging";

import { useFeatures } from "../../../useFeatures";
import { useEffectIfAuthenticated } from "../useEffectIfAuthenticated";
import { firebaseMessaging } from "./app";
import { useSendApi } from "./useSendApi";

export const useFCMClient = () => {
	const { features } = useFeatures();

	const sendApi = useSendApi();

	useEffectIfAuthenticated(() => {
		if (!features.notification) return;

		handler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [features.notification]);

	const handler = async () => {
		if (!firebaseMessaging || !(await isSupported())) return;

		try {
			onMessage(firebaseMessaging, (payload) => {
				const notificationTitle = payload.data?.title;
				return new Notification(notificationTitle || "Unknown Title", {
					body: notificationTitle,
					icon: "/firebase-logo.png",
				});
			});

			const token = await getFcmToken();

			if (token) {
				sendApi.handler({
					data: {
						token,
					},
				});
			}
		} catch (error) {
			logger.error(error);
		}
	};

	const getFcmToken = async () => {
		if (!firebaseMessaging) throw Error("FIREBASE_MESSAGING_MISSING");
		return getToken(firebaseMessaging);
	};
};
