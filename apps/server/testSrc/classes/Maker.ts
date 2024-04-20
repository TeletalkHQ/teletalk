import type {
	ExtendedFullName,
	FullNameWithUserId,
	UserPublicData,
} from "@repo/type-store";
import { maker as makerMain } from "@repo/utility-store";

export class Maker {
	emptyContact() {
		return {
			...makerMain.emptyContact(),
			isContact: false,
			userId: "",
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

	originalFullName(d: Partial<ExtendedFullName>) {
		return {
			originalFirstName: d.firstName || "",
			originalLastName: d.lastName || "",
		};
	}
}

export const maker = new Maker();

//CLEANME: merge Maker and RandomMaker
