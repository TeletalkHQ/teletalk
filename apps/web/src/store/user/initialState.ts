import { maker as makerMain } from "@repo/utility-store";

import { maker } from "~/classes/Maker";
import { UserState } from "~/types";

export const initialState: UserState = {
	addingContactWithCellphone: maker.emptyAddingContactWithCellphone(),
	addingContactWithUserId: makerMain.emptyFullName(),
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
