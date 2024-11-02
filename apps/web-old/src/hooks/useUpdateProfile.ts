import { VoidNoArgs } from "@repo/types";

import { useSettingsStore } from "~/store";

import { useEmitter } from "./useEmitter";

export const useUpdateProfile = () => {
	const settingsStore = useSettingsStore();
	const { handler: updatePublicDataHandler, loading } = useEmitter(
		"updateUserPublicInfo"
	);

	const handler = (cb?: VoidNoArgs) => {
		const { countryCode, countryName, phoneNumber, ...restProfile } =
			settingsStore.profile;

		updatePublicDataHandler.send(restProfile, cb);
	};

	return {
		loading,
		handler,
	};
};
