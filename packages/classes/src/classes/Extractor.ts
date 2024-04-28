import {
	Cellphone,
	ContactItem,
	CurrentUserData,
	DBUserData,
	ExtendedCellphone,
	ExtendedContactItem,
	ExtendedCurrentUserData,
	ExtendedFullName,
	ExtendedUnknownCellphone,
	ExtendedUserData,
	ExtendedUserPublicData,
	FullName,
	FullNameWithUserId,
	StringMap,
	UnknownCellphone,
	UserData,
	UserDataWithoutSessions,
	UserId,
	UserPublicData,
} from "@repo/type-store";

export class Extractor {
	cellphone(data: ExtendedCellphone): Cellphone {
		return {
			countryCode: data.countryCode,
			countryName: data.countryName,
			phoneNumber: data.phoneNumber,
		};
	}

	// eslint-disable-next-line sonarjs/no-identical-functions
	unknownCellphone(data: ExtendedUnknownCellphone): UnknownCellphone {
		return {
			countryCode: data.countryCode,
			countryName: data.countryName,
			phoneNumber: data.phoneNumber,
		};
	}

	contact(data: ExtendedContactItem): ContactItem {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			userId: data.userId,
		};
	}

	fullName(data: ExtendedFullName): FullName {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
		};
	}

	userData(data: ExtendedUserData): UserData {
		return {
			...this.contact(data),
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			blacklist: data.blacklist,
			sessions: data.sessions,
			contacts: data.contacts,
			createdAt: data.createdAt,
			status: data.status,
			username: data.username,
		};
	}

	// eslint-disable-next-line sonarjs/no-identical-functions
	dbUserData(data: DBUserData & StringMap): DBUserData {
		return {
			...this.contact(data),
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			blacklist: data.blacklist,
			sessions: data.sessions,
			contacts: data.contacts,
			createdAt: data.createdAt,
			status: data.status,
			username: data.username,
		};
	}

	userDataWithoutSessions(data: ExtendedUserData): UserDataWithoutSessions {
		const { sessions, ...rest } = this.userData(data);
		return rest;
	}

	currentUserData(data: ExtendedCurrentUserData): CurrentUserData {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			createdAt: data.createdAt,
			status: data.status,
			userId: data.userId,
			username: data.username,
		};
	}

	userPublicData(data: ExtendedUserPublicData): UserPublicData {
		return {
			...this.fullName(data),
			bio: data.bio,
			userId: data.userId,
			username: data.username,
		};
	}

	contactWithUserId(
		data: ExtendedFullName & { userId: UserId }
	): FullNameWithUserId {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			userId: data.userId,
		};
	}
}

export const extractor = new Extractor();
