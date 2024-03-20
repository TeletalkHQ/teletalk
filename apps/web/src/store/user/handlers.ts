import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { UserHandlers, UserSetState } from "~/types/store/user";

import { initialState } from "./initialState";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  updateCurrentUserData(userData) {
    set({ currentUserData: userData });
  },

  updateCurrentUserAvatarSrc({ avatarSrc: src }) {
    set((prevState) => ({
      currentUserData: {
        ...prevState.currentUserData,
        avatarSrc: src,
      },
    }));
  },

  updateSelectedUserIdForActions(u) {
    set(() => ({
      selectedUserIdForActions: u,
    }));
  },

  addContactWithUserId(newContact) {
    this.updateUser({
      ...newContact,
      isContact: true,
    });
  },

  addContactWithCellphone(newContact) {
    this.updateUser({
      ...newContact,
      isContact: true,
    });
  },

  addBlock({ userId }) {
    this.updateUser({
      userId,
      isBlocked: true,
    });
  },

  removeBlock({ userId }) {
    this.updateUser({
      userId,
      isBlocked: false,
    });
  },

  updateIsUserDataSettled(isUserDataSettled) {
    set({
      isUserDataSettled,
    });
  },

  updateUser(updatedUser) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (item) => item.userId === updatedUser.userId
      );

      const newUsers = [...prevState.users];

      if (index < 0) {
        newUsers.push({
          ...maker.emptyUser(),
          ...updatedUser,
          ...maker.originalFullName(updatedUser),
        });
      } else {
        newUsers[index] = {
          ...newUsers[index],
          ...updatedUser,
        };
      }

      return {
        users: newUsers,
      };
    });
  },

  updateOnlineUser(item) {
    set((prevState) => {
      const index = prevState.onlineUsers.findIndex(
        (i) => i.userId === item.userId
      );

      if (index < 0) {
        return {
          onlineUsers: [...prevState.onlineUsers, item],
        };
      }

      const copyOnlineUsers = [...prevState.onlineUsers];
      copyOnlineUsers[index] = item;

      return {
        onlineUsers: copyOnlineUsers,
      };
    });
  },

  updateOnlineUserList(onlineUsers) {
    set(() => {
      return {
        onlineUsers,
      };
    });
  },

  updateCurrentUserPublicData(publicData) {
    set((prevState) => ({
      currentUserData: {
        ...extractor.currentUserData({
          ...prevState.currentUserData,
        }),
        ...publicData,
      },
    }));
  },

  removeContact(removedContact) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (i) => i.userId === removedContact.userId
      );

      if (index < 0) return prevState;

      const newUsers = [...prevState.users];

      const item = newUsers[index];

      newUsers.splice(index, 1, {
        ...item,
        countryCode: "",
        countryName: "",
        firstName: "",
        isContact: false,
        lastName: "",
        phoneNumber: "",
      });

      return {
        users: newUsers,
      };
    });
  },

  reset() {
    set(initialState);
  },

  addNewUsers(u) {
    set((prevState) => ({
      users: [...prevState.users, ...u],
    }));
  },

  updateAddingContactWithCellphone(addingContact) {
    set((prevState) => ({
      addingContactWithCellphone: {
        ...prevState.addingContactWithCellphone,
        ...addingContact,
      },
    }));
  },

  updateAddingContactWithUserId(addingContact) {
    set((prevState) => ({
      addingContactWithUserId: {
        ...prevState.addingContactWithUserId,
        ...addingContact,
      },
    }));
  },
});
