import { maker } from "@repo/classes";

import { State } from "./types";

export const initialState: State = {
	addingContactWithCellphone: maker.emptyAddingContactWithCellphone(),
	addingContactWithUserId: maker.emptyFullName(),
	currentUserData: {
		avatarSrc: "",
		bio: "",
		//@ts-expect-error //FIXME
		countryCode: "",
		//@ts-expect-error //FIXME
		countryName: "",
		createdAt: 0,
		firstName: "",
		lastName: "",
		phoneNumber: "",
		status: {
			isActive: false,
		},
		userId: "",
		username: "",
	},
	isUserDataSettled: false,
	onlineUsers: [],
	selectedUserIdForActions: "",
	users: [],
};
