import { maker } from "~/classes/Maker";
import { UserState } from "~/types";

export const initialState: UserState = {
  addingContactWithCellphone: maker.emptyAddingContactWithCellphone(),
  addingContactWithUserId: maker.emptyFullName(),
  currentUserData: {
    avatarSrc: "",
    bio: "",
    //@ts-ignore
    countryCode: "",
    //@ts-ignore
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
