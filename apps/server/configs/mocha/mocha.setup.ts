import { testAppInitializer } from "@/utils/testAppInitializer";

await testAppInitializer();

const registerTests = async () => {
	//? // E2E
	//? // // Auth
	await import("@/__tests__/e2e/routes/auth/create-new-user.spec");
	await import("@/__tests__/e2e/routes/auth/logout.spec");
	await import("@/__tests__/e2e/routes/auth/sign-in.spec");
	await import("@/__tests__/e2e/routes/auth/verify.spec");
	//? // // User
	await import("@/__tests__/e2e/events/user/add-block.spec");
	await import("@/__tests__/e2e/events/user/add-contact.spec");
	await import("@/__tests__/e2e/events/user/remove-block.spec");
	await import("@/__tests__/e2e/events/user/remove-contact.spec");
	await import("@/__tests__/e2e/events/user/get-contacts.spec");
	await import("@/__tests__/e2e/events/user/get-user-info.spec");
	await import("@/__tests__/e2e/events/user/get-user-public-info.spec");
	await import("@/__tests__/e2e/events/user/update-user-public-info.spec");
	await import("@/__tests__/e2e/events/user/update-contact.spec");
	//? // // PrivateChat
	await import("@/__tests__/e2e/events/private-chat/get-one-private-chat.spec");
	await import("@/__tests__/e2e/events/private-chat/get-private-chats.spec");
	await import("@/__tests__/e2e/events/private-chat/send-message.spec");
	//? // // Middleware
	// await import("@/__tests__/e2e/middleware/attachSessionId.spec");
	// await import("@/__tests__/e2e/middleware/checkDataFields.spec");
	// await import("@/__tests__/e2e/middleware/checkEventAvailability.spec");
	// await import("@/__tests__/e2e/middleware/dynamicValidator.spec");

	//? // Units
	//? // // Services
	// await import("@/__tests__/unit/services/chat/sendMessage.spec");
	// await import("@/__tests__/unit/services/user/addBlock.spec");
	// await import("@/__tests__/unit/services/user/addContact.spec");
	// await import("@/__tests__/unit/services/user/addContactWithUserId.spec");
	// await import("@/__tests__/unit/services/user/addSession.spec");
	// await import("@/__tests__/unit/services/user/getContacts.spec");
	// await import("@/__tests__/unit/services/user/getUserPublicInfo.spec");
	// await import("@/__tests__/unit/services/user/removeBlock.spec");
	// await import("@/__tests__/unit/services/user/removeContact.spec");
	// await import("@/__tests__/unit/services/user/updateContact.spec");
	// await import("@/__tests__/unit/services/user/updateUserPublicInfo.spec");
	// await import("@/__tests__/unit/services/auth/createNewUser.spec");
	// await import("@/__tests__/unit/services/auth/logout.spec");

	//? // // Functions
	// await import("@/__tests__/unit/functions/crashServer.spec");
};

await registerTests();
