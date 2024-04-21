import { models } from "@repo/model";
import { Cellphone, ContactItem, CountryItem } from "@repo/type-store";
import { countries } from "@repo/vars";
import { nanoid } from "nanoid";

import { dataUsageManager } from "./DataUsageManager";
import { maker } from "./Maker";

type Min = number;
type Max = number;
type Length = number;

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

	id(size: number = models.native.id.max) {
		return nanoid(size);
	}

	country(): CountryItem {
		const index = this.numberWithRange(0, countries.length);
		return countries[index] || this.country();
	}

	cellphone(phoneNumberLength = models.native.phoneNumber.max): Cellphone {
		const country = this.country();
		return maker.cellphone(
			country.countryCode,
			country.countryName,
			this.stringNumber(phoneNumberLength || 10)
		);
	}

	unusedCellphone(
		phoneNumberLength = models.native.phoneNumber.max
	): Cellphone {
		const cellphone = this.cellphone(phoneNumberLength);

		const isCellphoneUsedBefore = dataUsageManager.isCellphoneUsed(cellphone);
		if (isCellphoneUsedBefore) return this.unusedCellphone();

		dataUsageManager.addUsedCellphone(cellphone);

		return cellphone;
	}

	contact(
		firstNameLength = models.native.firstName.max,
		lastNameLength = models.native.lastName.max,
		idLength = models.native.id.max,
		phoneNumberLength = models.native.phoneNumber.max
	) {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.cellphone(phoneNumberLength),
			userId: this.id(idLength),
		};
	}

	unusedContact(
		firstNameLength = models.native.firstName.max,
		lastNameLength = models.native.lastName.max,
		idLength = models.native.id.max
	): ContactItem {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.unusedCellphone(),
			userId: this.id(idLength),
		};
	}

	fullName(
		firstNameLength = models.native.firstName.max,
		lastNameLength = models.native.lastName.max
	) {
		return maker.fullName(
			this.string(firstNameLength),
			this.string(lastNameLength)
		);
	}
}

const randomMaker = new RandomMaker();

export { randomMaker, RandomMaker };
