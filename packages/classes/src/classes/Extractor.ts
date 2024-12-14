import { type BaseSchema } from "@repo/schema";
import { type StringMap } from "@repo/types";

export class Extractor {
	partialCellphone(data: Partial<BaseSchema.Cellphone> & StringMap) {
		return {
			countryCode: data.countryCode,
			countryName: data.countryName,
			phoneNumber: data.phoneNumber,
		};
	}

	cellphone(data: BaseSchema.Cellphone & StringMap): BaseSchema.Cellphone {
		return {
			countryCode: data.countryCode,
			countryName: data.countryName,
			phoneNumber: data.phoneNumber,
		};
	}

	contact(
		data: BaseSchema.Cellphone & BaseSchema.FullName & StringMap
	): BaseSchema.ContactsItem {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			userId: data.userId,
		};
	}

	contactByPhone(data: BaseSchema.Cellphone & BaseSchema.FullName & StringMap) {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			userId: data.userId,
		};
	}

	contactById(
		data: BaseSchema.Cellphone & BaseSchema.FullName & StringMap
	): BaseSchema.FullName & { userId: BaseSchema.UserId } {
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

	userInfo(data: BaseSchema.UserInfo & StringMap): BaseSchema.UserInfo {
		return {
			...this.cellphone(data),
			...this.fullName(data),
			userId: data.userId,
			avatarSrc: data.avatarSrc,
			bio: data.bio,
			blacklist: data.blacklist,
			contacts: data.contacts,
			createdAt: data.createdAt,
			status: data.status,
			username: data.username,
		};
	}

	// TODO: Rename or remove
	currentUserInfo(data: BaseSchema.UserInfo & StringMap): BaseSchema.UserInfo {
		return {
			...this.cellphone(data),
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

	userPublicInfo(
		data: BaseSchema.UserPublicInfo & StringMap
	): BaseSchema.UserPublicInfo {
		return {
			...this.fullName(data),
			bio: data.bio,
			userId: data.userId,
			username: data.username,
		};
	}

	privateChat(
		data: BaseSchema.PrivateChatsItem & StringMap
	): BaseSchema.PrivateChatsItem {
		return {
			chatId: data.chatId,
			createdAt: data.createdAt,
			messages: data.messages,
			participants: data.participants,
		};
	}
}

export const extractor = new Extractor();
