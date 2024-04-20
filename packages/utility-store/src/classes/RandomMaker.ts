import { Cellphone, ContactItem, CountryItem } from "@repo/type-store";
import { nanoid } from "nanoid";

import { countries } from "../variables/countries";
import { dataUsageManager } from "./DataUsageManager";
import { maker } from "./Maker";

let globalConfigs = {
	firstNameLength: 10,
	idLength: 30,
	lastNameLength: 10,
	phoneNumberLength: 10,
};

type Min = number;
type Max = number;
type Length = number;

class RandomMaker {
	private _stringNumber = "0123456789";
	private characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${this._stringNumber}`;

	static changeGlobalConfigs(newConfigs = globalConfigs) {
		globalConfigs = { ...globalConfigs, ...newConfigs };
	}

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

	id(size = globalConfigs.idLength) {
		return nanoid(size);
	}

	country(): CountryItem {
		const index = this.numberWithRange(0, countries.length);
		return countries[index] || this.country();
	}

	cellphone(phoneNumberLength = globalConfigs.phoneNumberLength): Cellphone {
		const country = this.country();
		return maker.cellphone(
			country.countryCode,
			country.countryName,
			this.stringNumber(phoneNumberLength || 10)
		);
	}

	unusedCellphone(
		phoneNumberLength = globalConfigs.phoneNumberLength
	): Cellphone {
		const cellphone = this.cellphone(phoneNumberLength);

		const isCellphoneUsedBefore = dataUsageManager.isCellphoneUsed(cellphone);
		if (isCellphoneUsedBefore) return this.unusedCellphone();

		dataUsageManager.addUsedCellphone(cellphone);

		return cellphone;
	}

	contact(
		firstNameLength = globalConfigs.firstNameLength,
		lastNameLength = globalConfigs.lastNameLength,
		idLength = globalConfigs.idLength,
		phoneNumberLength = globalConfigs.phoneNumberLength
	) {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.cellphone(phoneNumberLength),
			userId: this.id(idLength),
		};
	}

	unusedContact(
		firstNameLength = globalConfigs.firstNameLength,
		lastNameLength = globalConfigs.lastNameLength,
		idLength = globalConfigs.idLength
	): ContactItem {
		return {
			...this.fullName(firstNameLength, lastNameLength),
			...this.unusedCellphone(),
			userId: this.id(idLength),
		};
	}

	fullName(
		firstNameLength = globalConfigs.firstNameLength,
		lastNameLength = globalConfigs.lastNameLength
	) {
		return maker.fullName(
			this.string(firstNameLength),
			this.string(lastNameLength)
		);
	}
}

const randomMaker = new RandomMaker();

export { randomMaker, RandomMaker };
