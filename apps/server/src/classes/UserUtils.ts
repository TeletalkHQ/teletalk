import { EmptyUserData } from "@repo/type-store";
import { UserUtils as UserUtilitiesMain } from "@repo/utility-store";

type EmptyDBUserData = Omit<EmptyUserData, "contacts"> & { contacts: [] };

class UserUtils extends UserUtilitiesMain {
	constructor() {
		super();
	}

	getDBDefaultUserData(): EmptyDBUserData {
		return {
			...super.getDefaultUserData(),
			contacts: [],
		};
	}
}

export const userUtils = new UserUtils();
