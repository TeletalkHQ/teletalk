import { type BaseSchema } from "@repo/schema";
import { type StringMap } from "@repo/types";
import isEqual from "lodash/isEqual";

export class UserUtils {
	concatFirstNameWithLastName(
		userItem: Partial<BaseSchema.ClientUser>,
		publicInfo?: BaseSchema.UserPublicInfo
	) {
		const fn =
			userItem.firstName ||
			userItem.originalFirstName ||
			publicInfo?.firstName ||
			"";
		const ln =
			userItem.lastName ||
			userItem.originalLastName ||
			publicInfo?.lastName ||
			"";

		return `${fn} ${ln}`;
	}

	concatCountryCodeWithPhoneNumber(
		data: BaseSchema.Cellphone & StringMap,
		fallbackValue = ""
	) {
		if (!data.countryCode || !data.phoneNumber) return fallbackValue;
		return `+${data.countryCode} ${data.phoneNumber}`;
	}

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
