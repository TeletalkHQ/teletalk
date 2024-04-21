import {
	AddingContactWithCellphone,
	Cellphone,
	CountryCode,
	CountryName,
	EmptyCellphone,
	EmptyContact,
	EmptyFullName,
	ExtendedFullName,
	FirstName,
	FullName,
	FullNameWithUserId,
	LastName,
	PhoneNumber,
	UserItem,
	UserPublicData,
} from "@repo/type-store";

export class Maker {
	cellphone(
		countryCode: CountryCode,
		countryName: CountryName,
		phoneNumber: PhoneNumber
	): Cellphone {
		return {
			countryCode,
			countryName,
			phoneNumber,
		};
	}

	fullName(firstName: FirstName, lastName: LastName): FullName {
		return {
			firstName,
			lastName,
		};
	}

	emptyCellphone(): EmptyCellphone {
		return {
			countryCode: "",
			countryName: "",
			phoneNumber: "",
		};
	}

	emptyFullName(): EmptyFullName {
		return {
			firstName: "",
			lastName: "",
		};
	}

	emptyContact(): EmptyContact {
		return {
			...this.emptyCellphone(),
			...this.emptyFullName(),
			userId: "",
		};
	}

	emptyUserPublicData(): UserPublicData {
		return {
			...this.emptyFullName(),
			bio: "",
			userId: "",
			username: "",
		};
	}

	emptyContactWithUserId(): FullNameWithUserId {
		return {
			...this.emptyFullName(),
			userId: "",
		};
	}

	originalFullName(d: Partial<ExtendedFullName>) {
		return {
			originalFirstName: d.firstName || "",
			originalLastName: d.lastName || "",
		};
	}

	emptyUser(): UserItem {
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
		publicData: UserPublicData,
		userItem?: UserItem
	): UserItem {
		return {
			...this.emptyUser(),
			...publicData,
			...(userItem || {}),
			...this.originalFullName(publicData),
		};
	}

	emptyAddingContactWithCellphone(): AddingContactWithCellphone {
		return {
			...this.emptyCellphone(),
			...this.emptyFullName(),
		};
	}
}

export const maker = new Maker();
