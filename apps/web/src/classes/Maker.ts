import type {
	ExtendedFullName,
	FullNameWithUserId,
	UserPublicData,
} from "@repo/type-store";
import { maker as makerMain } from "@repo/utility-store";

import { AddingContactWithCellphone, UserItem } from "~/types";

export class Maker {
	emptyContact() {
		return {
			...makerMain.emptyContact(),
			isContact: false,
			userId: "",
		};
	}

	emptyAddingContactWithCellphone(): AddingContactWithCellphone {
		return {
			...makerMain.emptyCellphone(),
			...makerMain.emptyFullName(),
		};
	}

	emptyUserPublicData(): UserPublicData {
		return {
			...makerMain.emptyFullName(),
			bio: "",
			userId: "",
			username: "",
		};
	}

	emptyContactWithUserId(): FullNameWithUserId {
		return {
			...makerMain.emptyFullName(),
			userId: "",
		};
	}

	emptyUser(): UserItem {
		return {
			...this.emptyUserPublicData(),
			...makerMain.emptyCellphone(),
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
