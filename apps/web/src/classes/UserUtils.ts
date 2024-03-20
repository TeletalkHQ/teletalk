import type {
  ExtendedUnknownCellphone,
  UserPublicData,
} from "teletalk-type-store";
import { UserUtils as userUtilsMain } from "utility-store";

import { UserItem } from "~/types";

export class UserUtils extends userUtilsMain {
  concatFirstNameWithLastName(
    userItem: Partial<UserItem>,
    publicData?: UserPublicData
  ) {
    const fn =
      userItem.firstName ||
      userItem.originalFirstName ||
      publicData?.firstName ||
      "";
    const ln =
      userItem.lastName ||
      userItem.originalLastName ||
      publicData?.lastName ||
      "";

    return `${fn} ${ln}`;
  }

  concatCountryCodeWithPhoneNumber(
    data: ExtendedUnknownCellphone,
    fallbackValue = ""
  ) {
    if (!data.countryCode || !data.phoneNumber) return fallbackValue;
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

export const userUtils = new UserUtils();
