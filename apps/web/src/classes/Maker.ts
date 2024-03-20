import type {
  ExtendedFullName,
  FullNameWithUserId,
  UserPublicData,
} from "teletalk-type-store";
import { Maker as MakerMain } from "utility-store";

import { AddingContactWithCellphone, UserItem } from "~/types";

export class Maker extends MakerMain {
  //@ts-ignore
  emptyContact() {
    return {
      ...super.emptyContact(),
      isContact: false,
      userId: "",
    };
  }

  emptyAddingContactWithCellphone(): AddingContactWithCellphone {
    return {
      ...super.emptyCellphone(),
      ...super.emptyFullName(),
    };
  }

  emptyUserPublicData(): UserPublicData {
    return {
      ...super.emptyFullName(),
      bio: "",
      userId: "",
      username: "",
    };
  }

  emptyContactWithUserId(): FullNameWithUserId {
    return {
      ...super.emptyFullName(),
      userId: "",
    };
  }

  emptyUser(): UserItem {
    return {
      ...this.emptyUserPublicData(),
      ...this.emptyCellphone(),
      avatarSrc: "",
      isBlocked: false,
      isContact: false,
      originalFirstName: "",
      originalLastName: "",
    };
  }

  userWithPublicData(
    publicData: UserPublicData,
    userItem?: UserItem
  ): UserItem {
    return {
      ...this.emptyUser(),
      ...publicData,
      ...(userItem || {}),
      ...this.originalFullName(publicData),
    };
  }

  originalFullName(d: Partial<ExtendedFullName>) {
    return {
      originalFirstName: d.firstName || "",
      originalLastName: d.lastName || "",
    };
  }
}

export const maker = new Maker();
