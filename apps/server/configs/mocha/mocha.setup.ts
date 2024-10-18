import { testAppInitializer } from "@/utils/testAppInitializer";

await testAppInitializer();

const registerTests = async () => {
	//? E2E's
	await import("@/__tests__/e2e/routes/auth/create-new-user.spec");
	await import("@/__tests__/e2e/routes/auth/logout.spec");
	await import("@/__tests__/e2e/routes/auth/sign-in.spec");
	await import("@/__tests__/e2e/routes/auth/verify.spec");
	// await import("@/__tests__/e2e/events/other/getStuff.spec");
	// await import("@/__tests__/e2e/events/privateChat/getPrivateChat.spec");
	// await import("@/__tests__/e2e/events/privateChat/getPrivateChats.spec");
	// await import("@/__tests__/e2e/events/privateChat/sendMessage.spec");
	// await import("@/__tests__/e2e/events/user/addBlock.spec");
	// await import("@/__tests__/e2e/events/user/addContact.spec");
	// await import("@/__tests__/e2e/events/user/addContactWithUserId.spec");
	// await import("@/__tests__/e2e/events/user/getContacts.spec");
	// await import("@/__tests__/e2e/events/user/getPublicInfo.spec");
	// await import("@/__tests__/e2e/events/user/getUserData.spec");
	// await import("@/__tests__/e2e/events/user/removeBlock.spec");
	// await import("@/__tests__/e2e/events/user/removeContact.spec");
	// await import("@/__tests__/e2e/events/user/updateContact.spec");
	// await import("@/__tests__/e2e/events/user/updatePublicInfo.spec");
	// await import("@/__tests__/e2e/middleware/attachSessionId.spec");
	// await import("@/__tests__/e2e/middleware/checkDataFields.spec");
	// await import("@/__tests__/e2e/middleware/checkEventAvailability.spec");
	// await import("@/__tests__/e2e/middleware/dynamicValidator.spec");
	// //? UNITS
	// await import("@/__tests__/unit/services/auth/createNewUser.spec");
	// await import("@/__tests__/unit/services/auth/logout.spec");
	// await import("@/__tests__/unit/services/chat/sendMessage.spec");
	// await import("@/__tests__/unit/services/user/addBlock.spec");
	// await import("@/__tests__/unit/services/user/addContact.spec");
	// await import("@/__tests__/unit/services/user/addContactWithUserId.spec");
	// await import("@/__tests__/unit/services/user/addSession.spec");
	// await import("@/__tests__/unit/services/user/getContacts.spec");
	// await import("@/__tests__/unit/services/user/getPublicInfo.spec");
	// await import("@/__tests__/unit/services/user/removeBlock.spec");
	// await import("@/__tests__/unit/services/user/removeContact.spec");
	// await import("@/__tests__/unit/services/user/updateContact.spec");
	// await import("@/__tests__/unit/services/user/updatePublicInfo.spec");
	// await import("@/__tests__/unit/functions/crashServer.spec");
};

await registerTests();
