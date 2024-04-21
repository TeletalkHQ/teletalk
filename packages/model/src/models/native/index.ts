import { commonModels } from "./common";
import { otherModels } from "./other";
import { privateChatModels } from "./privateChat";
import { userModels } from "./user";

export const nativeModels = {
	...privateChatModels,
	...commonModels,
	...userModels,
	...otherModels,
};
