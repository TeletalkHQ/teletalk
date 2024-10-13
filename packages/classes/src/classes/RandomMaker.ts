import { BaseSchema, baseSchema, getStringMaxLength } from "@repo/schema";
import { countries } from "@repo/vars";
import { nanoid } from "nanoid";

import { dataUsageManager } from "./DataUsageManager";
import { maker } from "./Maker";

type Min = number;
type Max = number;
type Length = number;

// TODO: Replace methods with faker if possible
class RandomMaker {
	private _stringNumber = "0123456789";
	private characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${this._stringNumber}`;

	randomizer(characters = this.characters, length: Length) {
		return Array.from({ length })
			.map(() =>
				characters.charAt(Math.floor(Math.random() * characters.length))
			)
			.join("");
	}

	string(length: Length) {
		const characters = this.characters;
		return this.randomizer(characters, length);
	}

	number(length: Length) {
		return +this.stringNumber(length);
	}

	stringNumber(length: Length) {
		const characters = this._stringNumber;
		return this.randomizer(characters, length);
	}

	stringNumberWithRange(min: Min, max: Max) {
		return this.numberWithRange(min, max).toString();
	}

	numberWithRange(min: Min, max: Max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	id(size: number) {
		return nanoid(size);
	}

	userId(size = getStringMaxLength(baseSchema.userId)) {
		return nanoid(size);
	}

	country(): BaseSchema.CountriesItem {
		const index = this.numberWithRange(0, countries.length);
		return countries[index] || this.country();
	}

	cellphone(
		phoneNumberLength = getStringMaxLength(baseSchema.phoneNumber)
	): BaseSchema.Cellphone {
		const country = this.country();

		return maker.cellphone(
			country.countryCode,
			country.countryName,
			this.stringNumber(phoneNumberLength)
		);
	}

	unusedCellphone(
		phoneNumberLength = getStringMaxLength(baseSchema.phoneNumber)
	): BaseSchema.Cellphone {
		const cellphone = this.cellphone(phoneNumberLength);

		const isCellphoneUsedBefore = dataUsageManager.isCellphoneUsed(cellphone);
		if (isCellphoneUsedBefore) return this.unusedCellphone();

		dataUsageManager.addUsedCellphone(cellphone);

		return cellphone;
	}

	contact(
		firstNameLength = getStringMaxLength(baseSchema.firstName),
		lastNameLength = getStringMaxLength(baseSchema.lastName),
		idLength = getStringMaxLength(baseSchema.userId),
		phoneNumberLength = getStringMaxLength(baseSchema.phoneNumber)
	) {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.cellphone(phoneNumberLength),
			userId: this.id(idLength),
		};
	}

	unusedContact(
		firstNameLength = getStringMaxLength(baseSchema.firstName),
		lastNameLength = getStringMaxLength(baseSchema.lastName),
		idLength = getStringMaxLength(baseSchema.userId)
	): BaseSchema.ContactsItem {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.unusedCellphone(),
			userId: this.id(idLength),
		};
	}

	fullName(
		firstNameLength = getStringMaxLength(baseSchema.firstName),
		lastNameLength = getStringMaxLength(baseSchema.lastName)
	) {
		return maker.fullName(
			this.string(firstNameLength),
			this.string(lastNameLength)
		);
	}
}

const randomMaker = new RandomMaker();

export { randomMaker, RandomMaker };
