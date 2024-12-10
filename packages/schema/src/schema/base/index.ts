import { regex } from "@repo/assets/src/variables/regex";
import { z } from "zod";

export const avatarSrcSchema = z.string().min(0).max(800000).trim();

export const bioSchema = z.string().min(0).max(255).trim();

export const createdAtSchema = z.number();

export const countryCodeSchema = z
	.string()
	.min(1)
	.max(4)
	.regex(regex.numbers.enNumber)
	.trim();

export const countryNameSchema = z.string().min(2).max(50).trim();

export const countryShortNameSchema = z.string().min(2).max(80).trim();

export const firstNameSchema = z.string().min(2).max(18).trim();

export const isActiveSchema = z.boolean().default(false);

export const isOnlineSchema = z.boolean().default(false);

export const lastNameSchema = z.string().min(2).max(18).trim();

export const macAddressSchema = z.string().min(12).max(16).trim();

export const userIdSchema = z.string().min(30).max(35).trim();

export const phoneNumberSchema = z
	.string()
	.min(10)
	.max(14)
	.trim()
	.regex(regex.numbers.enNumber);

export const usernameSchema = z.string().min(0).max(12).trim();

export const emailSchema = z.string().min(5).max(100).trim();

export const passwordSchema = z.string().min(4).max(100).trim();

export const sessionSchema = z.string().min(100).max(400).trim();
export const sessionIdSchema = z.string().min(100).max(150).trim();

export const encryptedSessionSchema = z.string().min(100).max(400).trim();

export const signInCodeSchema = z
	.string()
	.length(6)
	.trim()
	.regex(regex.numbers.enNumber);

export const chatIdSchema = z.string().min(30).max(35).trim();

export const messageIdSchema = z.string().min(40).max(45).trim();

export const messageTextSchema = z.string().min(1).max(1000).trim();

const senderIdSchema = userIdSchema;

export const welcomeMessageSchema = z.string().min(10).max(100).trim();

export const pongSchema = z.string().min(1).max(100);

// TODO: Rename to privateMessage
export const messagesItemSchema = z.object({
	createdAt: createdAtSchema,
	messageId: messageIdSchema,
	messageText: messageTextSchema,
	sender: z.object({
		senderId: senderIdSchema,
	}),
});

// TODO: Rename to privateMessageList
export const messagesSchema = z.array(messagesItemSchema);

export const participantIdSchema = userIdSchema;

export const participantsItemSchema = z.object({
	participantId: participantIdSchema,
});

export const participantsSchema = z.array(participantsItemSchema).length(2);

export const privateChatsItemSchema = z.object({
	chatId: chatIdSchema,
	createdAt: createdAtSchema,
	messages: messagesSchema,
	participants: participantsSchema,
});

export const privateChatsSchema = z.array(privateChatsItemSchema);

export const sessionItemSchema = z.object({
	sessionId: sessionIdSchema,
	isExpired: z.boolean(),
});
export const sessionsSchema = z.array(sessionItemSchema);

export const statusSchema = z.object({
	isActive: isActiveSchema,
});

export const blockedUserSchema = z.object({
	userId: userIdSchema,
});

export const cellphoneSchema = z.object({
	countryCode: countryCodeSchema,
	countryName: countryNameSchema,
	phoneNumber: phoneNumberSchema,
});

export const fullNameSchema = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
});

export const contactsItemSchema = z.object({
	countryCode: countryCodeSchema.optional(),
	countryName: countryNameSchema.optional(),
	firstName: firstNameSchema,
	lastName: lastNameSchema.optional(),
	phoneNumber: phoneNumberSchema.optional(),
	userId: userIdSchema,
});

export const contactsSchema = z.array(contactsItemSchema);

export const blacklistItemSchema = z.object({
	userId: userIdSchema,
});

export const blacklistSchema = z.array(blacklistItemSchema);

// TODO: Mix with `userData`
export const userPublicInfoSchema = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	bio: bioSchema,
	userId: userIdSchema,
	username: usernameSchema,
	avatarSrc: avatarSrcSchema.optional(),
});

const userInfoSchema = z.intersection(
	userPublicInfoSchema,
	z.object({
		avatarSrc: avatarSrcSchema,
		blacklist: blacklistSchema,
		contacts: contactsSchema,
		countryCode: countryCodeSchema,
		countryName: countryNameSchema,
		createdAt: createdAtSchema,
		phoneNumber: phoneNumberSchema,
		status: statusSchema,
	})
);

// TODO: Rename | Remove
const DBUserDataSchema = z.intersection(
	userInfoSchema,
	z.object({
		sessions: sessionsSchema,
	})
);

export const onlineClientsItemSchema = z.object({
	userId: userIdSchema,
});

export const onlineClientsSchema = z.array(onlineClientsItemSchema);

export const countriesItemSchema = z.object({
	countryCode: countryCodeSchema,
	countryName: countryNameSchema,
	countryShortName: countryShortNameSchema,
	// TODO: Implement `uuid` schema
	uuid: z.string(),
});

export const countriesSchema = z.array(countriesItemSchema);

export const isNewUserSchema = z.boolean();
export const isBlockedSchema = z.boolean();
export const isContactSchema = z.boolean();

const clientUserSchema = userPublicInfoSchema.and(
	cellphoneSchema.and(
		z.object({
			avatarSrc: avatarSrcSchema,
			isBlocked: isBlockedSchema,
			isContact: isContactSchema,
			originalFirstName: firstNameSchema,
			originalLastName: lastNameSchema,
		})
	)
);

const themeNameSchema = z.enum(["dark", "light"]);

export const baseSchema = {
	avatarSrc: avatarSrcSchema,
	bio: bioSchema,
	blacklist: blacklistSchema,
	blacklistItem: blacklistItemSchema,
	blockedUser: blockedUserSchema,
	cellphone: cellphoneSchema,
	chatId: chatIdSchema,
	clientUser: clientUserSchema,
	contacts: contactsSchema,
	contactsItem: contactsItemSchema,
	countries: countriesSchema,
	countriesItem: countriesItemSchema,
	countryCode: countryCodeSchema,
	countryName: countryNameSchema,
	countryShortName: countryShortNameSchema,
	createdAt: createdAtSchema,
	DBUserData: DBUserDataSchema,
	email: emailSchema,
	encryptedSession: encryptedSessionSchema,
	firstName: firstNameSchema,
	fullName: fullNameSchema,
	isActive: isActiveSchema,
	isNewUser: isNewUserSchema,
	isOnline: isOnlineSchema,
	lastName: lastNameSchema,
	macAddress: macAddressSchema,
	messageId: messageIdSchema,
	messages: messagesSchema,
	messagesItem: messagesItemSchema,
	messageText: messageTextSchema,
	onlineClients: onlineClientsSchema,
	participantId: participantIdSchema,
	participants: participantsSchema,
	participantsItem: participantsItemSchema,
	password: passwordSchema,
	phoneNumber: phoneNumberSchema,
	pong: pongSchema,
	privateChats: privateChatsSchema,
	// TODO: Rename all `NAME_Item` to `one_NAME`
	privateChatsItem: privateChatsItemSchema,
	senderId: senderIdSchema,
	session: sessionSchema,
	sessionId: sessionIdSchema,
	sessionItem: sessionItemSchema,
	sessions: sessionsSchema,
	signInCode: signInCodeSchema,
	status: statusSchema,
	themeName: themeNameSchema,
	userId: userIdSchema,
	userInfo: userInfoSchema,
	username: usernameSchema,
	userPublicInfo: userPublicInfoSchema,
	welcomeMessage: welcomeMessageSchema,
};

export namespace BaseSchema {
	export type AvatarSrc = z.infer<typeof avatarSrcSchema>;
	export type Bio = z.infer<typeof bioSchema>;
	export type Blacklist = z.infer<typeof blacklistSchema>;
	export type BlacklistItem = z.infer<typeof blacklistItemSchema>;
	export type BlockedUser = z.infer<typeof blockedUserSchema>;
	export type Cellphone = z.infer<typeof cellphoneSchema>;
	export type ChatId = z.infer<typeof chatIdSchema>;
	export type ClientUser = z.infer<typeof clientUserSchema>;
	export type Contacts = z.infer<typeof contactsSchema>;
	export type ContactsItem = z.infer<typeof contactsItemSchema>;
	export type Countries = z.infer<typeof countriesSchema>;
	export type CountriesItem = z.infer<typeof countriesItemSchema>;
	export type CountryCode = z.infer<typeof countryCodeSchema>;
	export type CountryName = z.infer<typeof countryNameSchema>;
	export type CountryShortName = z.infer<typeof countryShortNameSchema>;
	export type CreatedAt = z.infer<typeof createdAtSchema>;
	export type DBUserData = z.infer<typeof DBUserDataSchema>;
	export type Email = z.infer<typeof emailSchema>;
	export type EncryptedSession = z.infer<typeof encryptedSessionSchema>;
	export type FirstName = z.infer<typeof firstNameSchema>;
	export type FullName = z.infer<typeof fullNameSchema>;
	export type IsActive = z.infer<typeof isActiveSchema>;
	export type IsNewUser = z.infer<typeof isNewUserSchema>;
	export type IsOnline = z.infer<typeof isOnlineSchema>;
	export type LastName = z.infer<typeof lastNameSchema>;
	export type MacAddress = z.infer<typeof macAddressSchema>;
	export type MessageId = z.infer<typeof messageIdSchema>;
	export type MessageText = z.infer<typeof messageTextSchema>;
	export type Messages = z.infer<typeof messagesSchema>;
	export type MessagesItem = z.infer<typeof messagesItemSchema>;
	export type OnlineClients = z.infer<typeof onlineClientsSchema>;
	export type ParticipantId = z.infer<typeof participantIdSchema>;
	export type Participants = z.infer<typeof participantsSchema>;
	export type ParticipantsItem = z.infer<typeof participantsItemSchema>;
	export type Password = z.infer<typeof passwordSchema>;
	export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
	export type Pong = z.infer<typeof pongSchema>;
	export type PrivateChats = z.infer<typeof privateChatsSchema>;
	export type PrivateChatsItem = z.infer<typeof privateChatsItemSchema>;
	export type SenderId = z.infer<typeof senderIdSchema>;
	export type Session = z.infer<typeof sessionSchema>;
	export type SessionId = z.infer<typeof sessionIdSchema>;
	export type SessionItem = z.infer<typeof sessionItemSchema>;
	export type Sessions = z.infer<typeof sessionsSchema>;
	export type SignInCode = z.infer<typeof signInCodeSchema>;
	export type Status = z.infer<typeof statusSchema>;
	export type ThemeName = z.infer<typeof themeNameSchema>;
	export type UserId = z.infer<typeof userIdSchema>;
	export type UserInfo = z.infer<typeof userInfoSchema>;
	export type UserPublicInfo = z.infer<typeof userPublicInfoSchema>;
	export type Username = z.infer<typeof usernameSchema>;
	export type WelcomeMessage = z.infer<typeof welcomeMessageSchema>;
}

export type BaseSchemaName = keyof typeof baseSchema;
