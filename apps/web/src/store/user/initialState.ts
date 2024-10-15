import { emptyMaker } from "@repo/classes";

import { State } from "./types";

export const initialState: State = {
	addingContactWithCellphone: emptyMaker.emptyAddingContactWithCellphone(),
	addingContactWithUserId: emptyMaker.emptyFullName(),
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
