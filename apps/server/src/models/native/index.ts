import { commonModels } from "~/models/native/common";
import { privateChatModels } from "~/models/native/privateChat";
import { userModels } from "~/models/native/user";

import { otherModels } from "./other";

export const nativeModels = {
	...privateChatModels,
	...commonModels,
	...userModels,
	...otherModels,
};
