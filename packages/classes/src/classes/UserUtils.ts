import { type BaseSchema } from "@repo/schema";
import { type StringMap } from "@repo/types";
import isEqual from "lodash/isEqual";

// TODO: Remove
export class UserUtils {
	getDefaultUserData(): BaseSchema.DBUserData {
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

	getDefaultUserDataWithoutSessions(): BaseSchema.UserInfo {
		const { sessions, ...rest } = this.getDefaultUserData();
		return rest;
	}

	findByCellphone(
		items: (BaseSchema.Cellphone & StringMap)[],
		targetCellphone: BaseSchema.Cellphone & StringMap
	): { index: number; item?: BaseSchema.Cellphone & StringMap } {
		const item = items.find((cellphone) => isEqual(cellphone, targetCellphone));

		return {
			index: item ? items.indexOf(item) : -1,
			item,
		};
	}
}

export const userUtils = new UserUtils();
