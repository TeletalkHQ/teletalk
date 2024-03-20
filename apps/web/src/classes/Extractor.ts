import { Extractor as ExtractorMain } from "utility-store";

import { CurrentUserData, ExtendedCurrentUserData } from "~/types";

export class Extractor extends ExtractorMain {
  currentUserData(data: ExtendedCurrentUserData): CurrentUserData {
    return {
      ...super.cellphone(data),
      ...super.fullName(data),
      avatarSrc: data.avatarSrc,
      bio: data.bio,
      createdAt: data.createdAt,
      status: data.status,
      userId: data.userId,
      username: data.username,
    };
  }
}

export const extractor = new Extractor();
