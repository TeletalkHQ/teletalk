import { extractor } from "@repo/classes";
import { SocketOnHandler } from "@repo/hl-types";
import { ExtendedCellphone } from "@repo/type-store";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { sessionManager } from "~/classes/SessionManager";
import { smsClient } from "~/classes/SmsClient";
import { utils } from "~/utils";

export const signIn: SocketOnHandler<"signIn"> = async (_socket, data) => {
	const verificationCode = utils.passwordGenerator();

	const cellphone = extractor.cellphone(data as ExtendedCellphone);

	//FIXME: Get host from socket
	// const host = getHostFromRequest(req);
	const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;

	await smsClient.sendVerificationCode(fullNumber, "host", verificationCode);

	const sessionId = sessionManager.generateSessionId();

	await authSessionStore.add(sessionId, {
		...cellphone,
		isVerified: false,
		verificationCode,
	});

	const session = await sessionManager.sign(sessionId);

	return {
		data: {
			session,
		},
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};
