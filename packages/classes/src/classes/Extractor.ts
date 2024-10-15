import { BaseSchema } from "@repo/schema";
import { StringMap } from "@repo/types";

export class Extractor {
	cellphone(data: BaseSchema.Cellphone & StringMap): BaseSchema.Cellphone {
		return {
			countryCode: data.countryCode,
			countryName: data.countryName,
			phoneNumber: data.phoneNumber,
		};
	}

	contact(data: BaseSchema.ContactsItem & StringMap): BaseSchema.ContactsItem {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			userId: data.userId,
		};
	}

	fullName(data: BaseSchema.FullName & StringMap): BaseSchema.FullName {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
		};
	}

	userData(data: BaseSchema.UserData & StringMap): BaseSchema.UserData {
		return {
			...this.contact(data),
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			blacklist: data.blacklist,
			contacts: data.contacts,
			createdAt: data.createdAt,
			status: data.status,
			username: data.username,
		};
	}

	currentUserData(data: BaseSchema.UserData & StringMap): BaseSchema.UserData {
		return {
			...this.contact(data),
			...this.fullName(data),
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			blacklist: data.blacklist,
			contacts: data.contacts,
			createdAt: data.createdAt,
			status: data.status,
			userId: data.userId,
			username: data.username,
		};
	}

	userPublicData(
		data: BaseSchema.UserPublicInfo & StringMap
	): BaseSchema.UserPublicInfo {
		return {
			...this.fullName(data),
			bio: data.bio,
			userId: data.userId,
			username: data.username,
		};
	}

	contactWithUserId(
		data: BaseSchema.FullName & { userId: BaseSchema.UserId } & StringMap
	): BaseSchema.FullName & { userId: BaseSchema.UserId } {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			userId: data.userId,
		};
	}
}

export const extractor = new Extractor();
