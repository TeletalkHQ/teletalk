import type {
	AddingContactWithCellphone,
	AvatarSrc,
	ContactItem,
	ContactItemWithEmptyCellphone,
	CountryItem,
	CurrentUserData,
	FullName,
	RemoveContactIO,
	StringMap,
	UserId,
	UserItem,
	UserPublicData,
	Users,
	VoidNoArgs,
	VoidWithArg,
} from "@repo/types";

import { StoreSetFn } from "../utils";

export interface BlacklistItem {
	userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface OnlineUser {
	userId: UserId;
	isOnline: boolean;
}

export type OnlineUserList = OnlineUser[];

export interface State {
	currentUserData: CurrentUserData;
	selectedUserIdForActions: UserId;
	users: Users;
	addingContactWithCellphone: AddingContactWithCellphone;
	addingContactWithUserId: FullName;
	onlineUsers: OnlineUserList;
	isUserDataSettled: boolean;
}

export type ExtendedCountryItem = CountryItem & StringMap;

export interface Handlers {
	addBlock: VoidWithArg<BlacklistItem>;
	addContactWithUserId: VoidWithArg<ContactItemWithEmptyCellphone>;
	addContact: VoidWithArg<ContactItem>;
	removeBlock: VoidWithArg<BlacklistItem>;
	removeContact: VoidWithArg<RemoveContactIO["output"]["removedContact"]>;
	reset: VoidNoArgs;
	updateAddingContactWithCellphone: VoidWithArg<
		Partial<AddingContactWithCellphone>
	>;
	updateAddingContactWithUserId: VoidWithArg<Partial<FullName>>;
	updateCurrentUserData: VoidWithArg<CurrentUserData>;
	updateIsUserDataSettled: VoidWithArg<boolean>;
	updateSelectedUserIdForActions: VoidWithArg<UserId>;
	addNewUsers: VoidWithArg<Users>;
	updateCurrentUserPublicData: VoidWithArg<UserPublicData>;
	updateCurrentUserAvatarSrc: VoidWithArg<{
		avatarSrc: AvatarSrc;
	}>;
	updateOnlineUser: VoidWithArg<OnlineUser>;
	updateOnlineUserList: VoidWithArg<OnlineUserList>;
	updateUser: VoidWithArg<Partial<UserItem> & { userId: UserId }>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
