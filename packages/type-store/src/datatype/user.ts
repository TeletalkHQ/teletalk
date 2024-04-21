import { countries } from "@repo/vars";

import type { CreatedAt, Id, StringMap } from "..";

export type AvatarSrc = string;
export type Bio = string;
export type SessionId = string;
export type FirstName = string;
export type IsActive = boolean;
export type LastName = string;
export type NewUser = boolean;
export type PhoneNumber = string;
export type UserId = Id;
export type Username = string;
export type VerificationCode = string;

export type Countries = typeof countries;
export type CountryItem = (typeof countries)[number];
export type CountryName = CountryItem["countryName"];
export type CountryCode = CountryItem["countryCode"];
export type CountryShortName = CountryItem["countryShortName"];

export interface Cellphone {
	countryCode: CountryCode;
	countryName: CountryName;
	phoneNumber: PhoneNumber;
}
export interface EmptyCellphone {
	countryCode: "";
	countryName: "";
	phoneNumber: "";
}

export interface PartialEmptyCellphone {
	countryCode: CountryCode | "";
	countryName: CountryName | "";
	phoneNumber: PhoneNumber | "";
}

export type ExtendedCellphone = Cellphone & StringMap;
export type UnknownCellphone = {
	countryCode: string;
	countryName: string;
	phoneNumber: string;
};
export type ExtendedUnknownCellphone = UnknownCellphone & StringMap;
export type ExtendedPartiallyEmptyCellphone = PartialEmptyCellphone & StringMap;

export interface FullName {
	firstName: FirstName;
	lastName: LastName;
}
export interface EmptyFullName {
	firstName: "";
	lastName: "";
}
export type ExtendedFullName = FullName & StringMap;
export type FullNameWithUserId = FullName & {
	userId: UserId;
};

export type ContactItem = Cellphone & FullNameWithUserId;
export type ContactItemWithEmptyCellphone = EmptyCellphone & FullNameWithUserId;
export type ContactItemWithoutUserId = Cellphone & FullName;
export type ExtendedContactItem = ContactItem & StringMap;
export type EmptyContact = EmptyCellphone & EmptyFullName & { userId: "" };
export type Contacts = ContactItem[];
export type DBContactItem = FullNameWithUserId & {
	isCellphoneAccessible: boolean;
};
export type DBContacts = DBContactItem[];

export type EncryptedSession = string;

export interface SessionItem {
	sessionId: SessionId;
}
export type Sessions = SessionItem[];

export interface Status {
	isActive: IsActive;
}

export interface BlackListItem {
	userId: UserId;
}
export type BlackList = BlackListItem[];

export interface UserData extends ContactItem {
	avatarSrc: AvatarSrc;
	bio: Bio;
	blacklist: BlackList;
	sessions: Sessions;
	contacts: Contacts;
	createdAt: CreatedAt;
	status: Status;
	username: Username;
}
export type DBUserData = Omit<UserData, "contacts"> & { contacts: DBContacts };
export type UserDataWithoutSessions = Omit<UserData, "sessions">;
export type EmptyUserData = Omit<
	UserData,
	"countryCode" | "countryName" | "phoneNumber"
> &
	EmptyCellphone & {
		status: Status;
	};
export type EmptyUserDataWithoutSessions = Omit<EmptyUserData, "sessions">;
export type ExtendedUserData = UserData & StringMap;
export type ExtendedUserDataWithoutSessions = UserDataWithoutSessions &
	StringMap;

export interface UserPublicData {
	bio: Bio;
	firstName: FirstName;
	lastName: LastName;
	userId: UserId;
	username: Username;
}
export type ExtendedUserPublicData = UserPublicData & StringMap;

export interface ClientStatus {
	connections: number;
	userId: UserId;
}

export type ClientStatusList = {
	[key: string]: ClientStatus;
};
