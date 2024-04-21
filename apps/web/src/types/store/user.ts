import type {
	AddingContactWithCellphone,
	AvatarSrc,
	Bio,
	Cellphone,
	ContactItem,
	ContactItemWithEmptyCellphone,
	CountryItem,
	FullName,
	FullNameWithUserId,
	RemoveContactIO,
	Status,
	UserId,
	UserItem,
	UserPublicData,
	Username,
	Users,
} from "@repo/type-store";

import { StoreSetFn, StringMap, VoidNoArgsFn, VoidWithArg } from "~/types";

export interface BlacklistItem {
	userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface OnlineUser {
	userId: UserId;
	isOnline: boolean;
}

export type OnlineUserList = OnlineUser[];

export type CurrentUserData = FullNameWithUserId &
	Cellphone & {
		bio: Bio;
		username: Username;
		status: Status;
		createdAt: number;
		avatarSrc: AvatarSrc;
	};

export interface UserState {
	currentUserData: CurrentUserData;
	selectedUserIdForActions: UserId;
	users: Users;
	addingContactWithCellphone: AddingContactWithCellphone;
	addingContactWithUserId: FullName;
	onlineUsers: OnlineUserList;
	isUserDataSettled: boolean;
}

export type ExtendedCurrentUserData = CurrentUserData & StringMap;

export type ExtendedCountryItem = CountryItem & StringMap;

export interface UserHandlers {
	addBlock: VoidWithArg<BlacklistItem>;
	addContactWithUserId: VoidWithArg<ContactItemWithEmptyCellphone>;
	addContactWithCellphone: VoidWithArg<ContactItem>;
	removeBlock: VoidWithArg<BlacklistItem>;
	removeContact: VoidWithArg<RemoveContactIO["output"]["removedContact"]>;
	reset: VoidNoArgsFn;
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

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
