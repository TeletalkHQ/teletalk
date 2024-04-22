import {
	EmptyUserData,
	EmptyUserDataWithoutSessions,
	ExtendedCellphone,
} from "@repo/type-store";

import { utils } from "../utils";

export class UserUtils {
	getDefaultUserData(): EmptyUserData {
		return {
			avatarSrc: "",
			bio: "",
			blacklist: [],
			contacts: [],
			countryCode: "",
			countryName: "",
			createdAt: 0,
			firstName: "",
			lastName: "",
			phoneNumber: "",
			sessions: [],
			status: {
				isActive: false,
			},
			userId: "",
			username: "",
		};
	}

	getDefaultUserDataWithoutSessions(): EmptyUserDataWithoutSessions {
		const { sessions, ...rest } = this.getDefaultUserData();
		return rest;
	}

	findByCellphone(
		items: ExtendedCellphone[],
		targetCellphone: ExtendedCellphone
	): { index: number; item?: ExtendedCellphone } {
		const item = items.find((cellphone) =>
			utils.isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone)
		);

		return {
			index: item ? items.indexOf(item) : -1,
			item,
		};
	}
}

export const userUtils = new UserUtils();
