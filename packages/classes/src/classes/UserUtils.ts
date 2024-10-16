import { BaseSchema } from "@repo/schema";
import { StringMap } from "@repo/types";
import { utils } from "@repo/utils";

export class UserUtils {
	concatFirstNameWithLastName(
		userItem: Partial<BaseSchema.ClientUser>,
		publicData?: BaseSchema.UserPublicInfo
	) {
		const fn =
			userItem.firstName ||
			userItem.originalFirstName ||
			publicData?.firstName ||
			"";
		const ln =
			userItem.lastName ||
			userItem.originalLastName ||
			publicData?.lastName ||
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
