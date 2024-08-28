import { maker } from "@repo/classes";
import type { UserId } from "@repo/types";

import { useUserStore } from "~/store";

export const useFindUserById = (userId: UserId) => {
	const userStore = useUserStore();

	const finder = (u: UserId) => {
		return (
			userStore.users.find((i) => i.userId === (u || userId)) ||
			maker.emptyUser()
		);
	};

	return {
		data: finder(userId),
		finder,
	};
};
