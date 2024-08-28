import { BaseSchema } from "@repo/schema";
import { StringMap } from "@repo/types";

export class Maker {
	cellphone(
		countryCode: BaseSchema.CountryCode,
		countryName: BaseSchema.CountryName,
		phoneNumber: BaseSchema.PhoneNumber
	): BaseSchema.Cellphone {
		return {
			countryCode,
			countryName,
			phoneNumber,
		};
	}

	fullName(
		firstName: BaseSchema.FirstName,
		lastName: BaseSchema.LastName
	): BaseSchema.FullName {
		return {
			firstName,
			lastName,
		};
	}

	emptyCellphone(): BaseSchema.Cellphone {
		return {
			countryCode: "",
			countryName: "",
			phoneNumber: "",
		};
	}

	emptyFullName(): BaseSchema.FullName {
		return {
			firstName: "",
			lastName: "",
		};
	}

	emptyContact(): BaseSchema.ContactsItem {
		return {
			...this.emptyCellphone(),
			...this.emptyFullName(),
			userId: "",
		};
	}

	emptyUserPublicData(): BaseSchema.PublicData {
		return {
			...this.emptyFullName(),
			bio: "",
			userId: "",
			username: "",
		};
	}

	emptyContactWithUserId(): BaseSchema.FullName & {
		userId: BaseSchema.UserId;
	} {
		return {
			...this.emptyFullName(),
			userId: "",
		};
	}

	originalFullName(d: Partial<BaseSchema.FullName & StringMap>) {
		return {
			originalFirstName: d.firstName || "",
			originalLastName: d.lastName || "",
		};
	}

	emptyUser(): BaseSchema.ClientUser {
		return {
			...this.emptyUserPublicData(),
			...this.emptyCellphone(),
			avatarSrc: "",
			isBlocked: false,
			isContact: false,
			originalFirstName: "",
			originalLastName: "",
		};
	}

	userWithPublicData(
		publicData: BaseSchema.PublicData,
		userItem?: BaseSchema.ClientUser
	): BaseSchema.ClientUser {
		return {
			...this.emptyUser(),
			...publicData,
			...(userItem || {}),
			...this.originalFullName(publicData),
		};
	}

	emptyAddingContactWithCellphone(): BaseSchema.Cellphone &
		BaseSchema.FullName {
		return {
			...this.emptyCellphone(),
			...this.emptyFullName(),
		};
	}
}

export const maker = new Maker();
