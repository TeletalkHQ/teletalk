"use client";

import { STORAGE_KEY } from "@repo/classes";
import { logger } from "@repo/logger";
import { usePermissionStore } from "@repo/store";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface Features {
	apiValidation: boolean;
	location: boolean;
	notification: boolean;
}

export type FeatureName = keyof Features;

function getDefaultFeatures(): Features {
	return {
		apiValidation: true,
		location: false,
		notification: false,
	};
}

export const useFeatures = () => {
	const [featuresFromLocal, setFeatures] = useLocalStorage<Features>(
		STORAGE_KEY.FEATURES,
		getDefaultFeatures()
	);

	const permissionStore = usePermissionStore();
	const [isPermissionHasSet, setIsPermissionHasSet] = useLocalStorage(
		STORAGE_KEY.IS_PERMISSION_SET,
		false
	);

	const features = {
		...featuresFromLocal,
		location: permissionStore.isPermissionLoaded
			? featuresFromLocal.location
			: false,
		notification: permissionStore.isPermissionLoaded
			? featuresFromLocal.notification
			: false,
	};

	useEffect(() => {
		if (permissionStore.isPermissionLoaded) setUIFeatures(features);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [permissionStore.isPermissionLoaded]);

	const [UIFeatures, setUIFeatures] = useState<Features>(features);

	const featuresRef = useRef(featuresFromLocal);

	const updateFeature = (name: FeatureName, value: boolean) => {
		featuresRef.current[name] = value;

		setFeatures(featuresRef.current);
	};

	const updateUIFeature = (name: FeatureName, value: boolean) => {
		setUIFeatures({
			...UIFeatures,
			[name]: value,
		});
	};

	const updatePermissions = async () => {
		// FIXME: Don't make it `true` when there is an error
		setIsPermissionHasSet(true);

		updateLocationPermission();
		await updateNotificationPermission();
	};

	const updateNotificationPermission = async () => {
		if (UIFeatures.notification) {
			const result = await Notification.requestPermission();
			updateFeature("notification", result === "granted");
		} else {
			updateFeature("notification", false);
		}
	};

	const updateLocationPermission = () => {
		if (UIFeatures.location)
			navigator.geolocation.getCurrentPosition(
				onSuccessReqLocation,
				onErrorReqLocation
			);
		else updateFeature("location", false);
	};

	const onSuccessReqLocation = () => {
		updateFeature("location", true);
	};

	const onErrorReqLocation = (error: unknown) => {
		enqueueSnackbar({
			variant: "error",
			// FIXME: Not the correct message
			message: "Unable to get the location permission",
		});

		// eslint-disable-next-line @cspell/spellchecker
		logger.log("locationerror:", error);
	};

	return {
		features,
		featuresFromLocal,
		isPermissionHasSet,
		setFeatures,
		UIFeatures,
		updateFeature,
		updatePermissions,
		updateUIFeature,
	};
};
