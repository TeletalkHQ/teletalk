import {
	Cellphone,
	CountryCode,
	CountryName,
	EmptyCellphone,
	EmptyContact,
	EmptyFullName,
	FirstName,
	FullName,
	LastName,
	PhoneNumber,
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
}

export const maker = new Maker();
