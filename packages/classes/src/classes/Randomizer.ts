import { BaseSchema, baseSchema, getStringMaxLength } from "@repo/schema";
import { countries } from "@repo/vars";
import { nanoid } from "nanoid";

import { dataUsageManager } from "./DataUsageManager";
import { extractor } from "./Extractor";
import { emptyMaker } from "./Maker";

type Min = number;
type Max = number;
type Length = number;

// TODO: Replace methods with faker if possible
export class Randomizer {
	private _stringNumber = "0123456789";
	private characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${this._stringNumber}`;

	randomizer(characters = this.characters, length: Length) {
		return Array.from({ length })
			.map(() =>
				characters.charAt(Math.floor(Math.random() * characters.length))
			)
			.join("");
	}

	sessionId(
		length = getStringMaxLength(baseSchema.sessionId)
	): BaseSchema.SessionId {
		return this.string(length);
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

	id(length: number) {
		return nanoid(length);
	}

	userId(length = getStringMaxLength(baseSchema.userId)) {
		return this.id(length);
	}

	country(): BaseSchema.CountriesItem {
		const index = this.numberWithRange(0, countries.length);
		return countries[index] || this.country();
	}

	cellphone(
		phoneNumberLength = getStringMaxLength(baseSchema.phoneNumber)
	): BaseSchema.Cellphone {
		const country = this.country();

		return emptyMaker.cellphone(
			country.countryCode,
			country.countryName,
			this.stringNumber(phoneNumberLength)
		);
	}

	unusedCellphone(
		phoneNumberLength = getStringMaxLength(baseSchema.phoneNumber)
	): BaseSchema.Cellphone {
		const cellphone = this.cellphone(phoneNumberLength);

		const isUsed = dataUsageManager.isCellphoneUsed(cellphone);
		if (isUsed) return this.unusedCellphone();

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

	contactWithCellphone(): Omit<BaseSchema.ContactsItem, "userId"> {
		const { userId, ...rest } = this.contact();
		return rest;
	}

	contactWithUserId(): BaseSchema.FullName & { userId: BaseSchema.UserId } {
		const contact = this.contact();
		return {
			...extractor.fullName(contact),
			userId: contact.userId,
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
		return emptyMaker.fullName(
			this.string(firstNameLength),
			this.string(lastNameLength)
		);
	}

	userPublicInfo(): BaseSchema.UserPublicInfo {
		return {
			...this.fullName(),
			bio: this.string(getStringMaxLength(baseSchema.bio)),
			username: this.string(getStringMaxLength(baseSchema.username)),
			userId: this.id(getStringMaxLength(baseSchema.userId)),
		};
	}

	arrayOfUserPublicInfo(
		length: number,
		userId?: BaseSchema.UserId
	): BaseSchema.UserPublicInfo[] {
		const data: BaseSchema.UserPublicInfo[] = [];

		for (let i = 0; i < length; i++) {
			const publicInfo = this.userPublicInfo();
			data.push({
				...publicInfo,
				userId: userId || publicInfo.userId,
			});
		}
		return data;
	}

	privateMessageItem(): BaseSchema.MessagesItem {
		return {
			createdAt: Date.now(),
			messageId: this.id(getStringMaxLength(baseSchema.messageId)),
			messageText: this.messageText(),
			sender: {
				senderId: this.userId(),
			},
		};
	}

	messageText(): BaseSchema.MessageText {
		return this.string(getStringMaxLength(baseSchema.messageText));
	}
}

export const randomMaker = new Randomizer();
