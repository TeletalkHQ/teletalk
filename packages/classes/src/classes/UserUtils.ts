import {
	EmptyUserData,
	EmptyUserDataWithoutSessions,
	ExtendedCellphone,
	ExtendedUnknownCellphone,
	UserItem,
	UserPublicData,
} from "@repo/type-store";
import { utils } from "@repo/utils";

type EmptyDBUserData = Omit<EmptyUserData, "contacts"> & { contacts: [] };

export class UserUtils {
	concatFirstNameWithLastName(
		userItem: Partial<UserItem>,
		publicData?: UserPublicData
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
		data: ExtendedUnknownCellphone,
		fallbackValue = ""
	) {
		if (!data.countryCode || !data.phoneNumber) return fallbackValue;
		return `+${data.countryCode} ${data.phoneNumber}`;
	}

	//CLEANME: Remove this method
	getDBDefaultUserData(): EmptyDBUserData {
		return {
			...this.getDefaultUserData(),
			contacts: [],
		};
	}

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
