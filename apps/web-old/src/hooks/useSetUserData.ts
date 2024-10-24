import { emptyMaker } from "@repo/classes";
import { extractor } from "@repo/classes";
import { SocketErrorCallback, SocketResponseCallback } from "@repo/types";
import type { UserItem } from "@repo/types";
import { useEffect } from "react";

import { storage } from "~/classes/Storage";
import { useGlobalStore, useUserStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useSetUserData = ({
	errorCb,
	successCb,
}: {
	successCb?: SocketResponseCallback<"getUserData">;
	errorCb?: SocketErrorCallback;
} = {}) => {
	const { handler: getUserDataHandler, loading } = useEmitter("getUserData");
	const userStore = useUserStore();
	const globalStore = useGlobalStore();
	const router = useCustomRouter();

	const handler = () => {
		if (
			globalStore.isInitialized &&
			router.pathname.includes("messenger") &&
			storage.get("session")
		) {
			return getUserDataHandler.send(
				undefined,
				(response) => {
					userStore.updateCurrentUserData(
						extractor.currentUserData(response.data.user)
					);

					const users: UserItem[] = response.data.user.contacts.map((item) => ({
						...emptyMaker.emptyUser(),
						...item,
						isContact: true,
						isBlocked: response.data.user.blacklist.some(
							(i) => i.userId === item.userId
						),
					}));

					const usersThatExistOnlyInTheBlacklist: UserItem[] =
						response.data.user.blacklist
							.filter((i) => !users.some((j) => i.userId === j.userId))
							.map((item) => ({
								...emptyMaker.emptyUser(),
								...item,
								isBlocked: true,
							}));

					users.push(...usersThatExistOnlyInTheBlacklist);

					userStore.addNewUsers(users);
					userStore.updateIsUserDataSettled(true);

					successCb?.(response);
				},
				errorCb
			);
		}
	};

	useEffect(() => {
		handler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalStore.isInitialized]);

	return {
		handler,
		loading,
	};
};
