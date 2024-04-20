import { nativeModelBuilder } from "~/classes/NativeModelBuilder";
import {
	AvatarSrc,
	Bio,
	Blacklist,
	ClientId,
	Contacts,
	CountryCode,
	CountryName,
	CountryShortName,
	FirstName,
	IsActive,
	IsOnline,
	LastName,
	MacAddress,
	PhoneNumber,
	Sessions,
	Status,
	Username,
	VerificationCode,
} from "~/types";

import { commonModels } from "./common";

export const userModels = {
	avatarSrc: nativeModelBuilder
		.create<AvatarSrc>()
		.type("string")
		.required(true)
		.empty(true)
		.defaultValue("")
		.trim(true)
		.min(0)
		.max(800000)
		.build(),
	bio: nativeModelBuilder
		.create<Bio>()
		.type("string")
		.required(true)
		.empty(true)
		.trim(true)
		.min(0)
		.defaultValue("")
		.max(255)
		.build(),
	blacklist: nativeModelBuilder
		.create<Blacklist>()
		.type("array")
		.required(true)
		.empty(true)
		.build(),
	contacts: nativeModelBuilder
		.create<Contacts>()
		.type("array")
		.required(true)
		.empty(true)
		.build(),
	countryCode: nativeModelBuilder
		.create<CountryCode>()
		.type("string")
		.required(true)
		.empty(false)
		.min(1)
		.max(4)
		.numeric(true)
		.trim(true)
		.build(),
	countryName: nativeModelBuilder
		.create<CountryName>()
		.type("string")
		.required(true)
		.empty(false)
		.min(2)
		.max(50)
		.trim(true)
		.build(),
	countryShortName: nativeModelBuilder
		.create<CountryShortName>()
		.type("string")
		.required(true)
		.empty(false)
		.min(2)
		.max(80)
		.trim(true)
		.build(),
	createdAt: commonModels.createdAt,
	firstName: nativeModelBuilder
		.create<FirstName>()
		.type("string")
		.required(true)
		.empty(false)
		.min(2)
		.max(18)
		.trim(true)
		.build(),
	isActive: nativeModelBuilder
		.create<IsActive>()
		.type("boolean")
		.required(true)
		.defaultValue(false)
		.build(),
	isOnline: nativeModelBuilder
		.create<IsOnline>()
		.type("boolean")
		.required(true)
		.defaultValue(false)
		.build(),
	lastName: nativeModelBuilder
		.create<LastName>()
		.type("string")
		.required(true)
		.empty(true)
		.min(2)
		.max(18)
		.trim(true)
		.build(),
	macAddress: nativeModelBuilder
		.create<MacAddress>()
		.type("string")
		.required(true)
		.empty(false)
		.min(12)
		.max(16)
		.trim(true)
		.unique(true)
		.build(),
	phoneNumber: nativeModelBuilder
		.create<PhoneNumber>()
		.type("string")
		.required(true)
		.empty(false)
		.min(10)
		.max(14)
		.numeric(true)
		.unique(true)
		.build(),
	sessionId: nativeModelBuilder
		.create<ClientId>()
		.type("string")
		.empty(false)
		.required(true)
		.min(100)
		.max(150)
		.unique(true)
		.trim(true)
		.build(),
	sessions: nativeModelBuilder
		.create<Sessions>()
		.type("array")
		.required(true)
		.empty(true)
		.build(),
	status: nativeModelBuilder
		.create<Status>()
		.type("object")
		.required(true)
		.build(),
	userId: commonModels.id,
	username: nativeModelBuilder
		.create<Username>()
		.type("string")
		.required(true)
		.empty(true)
		.min(0)
		.max(12)
		.unique(false)
		.trim(true)
		.build(),
	verificationCode: nativeModelBuilder
		.create<VerificationCode>()
		.type("string")
		.required(true)
		.empty(false)
		.length(6)
		.numeric(true)
		.trim(true)
		.build(),
};
