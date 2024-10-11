import { regex } from "@repo/vars";
import { z } from "zod";

const avatarSrc = z.string().min(0).max(800000).trim();

const bio = z.string().min(0).max(255).trim();

const createdAt = z.number();

const countryCode = z
	.string()
	.min(1)
	.max(4)
	.regex(regex.numbers.enNumber)
	.trim();

const countryName = z.string().min(2).max(50).trim();

const countryShortName = z.string().min(2).max(80).trim();

const firstName = z.string().min(2).max(18).trim();

const isActive = z.boolean().default(false);

const isOnline = z.boolean().default(false);

const lastName = z.string().min(2).max(18).trim();

const macAddress = z.string().min(12).max(16).trim();

const userId = z.string().min(30).max(35).trim();

const phoneNumber = z
	.string()
	.min(10)
	.max(14)
	.trim()
	.regex(regex.numbers.enNumber);

const username = z.string().min(0).max(12).trim();

const sessionId = z.string().min(100).max(150).trim();

const encryptedSession = z.string().min(100).max(400).trim();

const verificationCode = z
	.string()
	.length(6)
	.trim()
	.regex(regex.numbers.enNumber);

const chatId = z.string().min(30).max(35).trim();

const messageId = z.string().min(40).max(45).trim();

const messageText = z.string().min(1).max(1000).trim();

const senderId = userId;

const welcomeMessage = z.string().min(10).max(100).trim();

const pong = z.string().min(1).max(100);

// TODO: Rename to privateMessage
const messagesItem = z.object({
	createdAt,
	messageId,
	messageText,
	sender: z.object({
		senderId,
	}),
});

// TODO: Rename to privateMessageList
const messages = z.array(messagesItem);

const participantId = userId;

const participantsItem = z.object({
	participantId,
});

const participants = z.array(participantsItem).length(2);

const privateChatsItem = z.object({
	chatId,
	createdAt,
	messages,
	participants,
});

const privateChats = z.array(privateChatsItem);

const sessions = z.array(
	z.object({
		sessionId,
	})
);

const status = z.object({});

const blockedUser = z.object({
	userId,
});

const cellphone = z.object({
	countryCode,
	countryName,
	phoneNumber,
});

const fullName = z.object({
	firstName,
	lastName,
});

const contactsItem = z.object({
	countryCode,
	countryName,
	firstName,
	lastName,
	phoneNumber,
	userId,
});

const contacts = z.array(contactsItem);

const blacklistItem = z.object({
	userId,
});

const blacklist = z.array(blacklistItem);

// TODO: Mix with `userData`
const publicData = z.object({
	firstName,
	lastName,
	bio,
	userId,
	username,
});

const userData = z.object({
	avatarSrc,
	bio,
	blacklist,
	contacts,
	countryCode,
	countryName,
	createdAt,
	firstName,
	lastName,
	phoneNumber,
	status,
	userId,
	username,
});

const DBUserData = userData.and(
	z.object({
		sessions,
	})
);

const onlineClientsItem = z.object({
	userId,
});

const onlineClients = z.array(onlineClientsItem);

const countriesItem = z.object({
	countryCode,
	countryName,
	countryShortName,
});

const countries = z.array(countriesItem);

const isNewUser = z.boolean();
const isBlocked = z.boolean();
const isContact = z.boolean();

const clientUser = publicData.and(
	cellphone.and(
		z.object({
			avatarSrc,
			isBlocked,
			isContact,
			originalFirstName: firstName,
			originalLastName: lastName,
		})
	)
);

export const baseSchema = {
	avatarSrc,
	bio,
	blacklist,
	blacklistItem,
	blockedUser,
	cellphone,
	chatId,
	clientUser,
	contacts,
	contactsItem,
	countries,
	countriesItem,
	countryCode,
	countryName,
	countryShortName,
	createdAt,
	DBUserData,
	firstName,
	fullName,
	isActive,
	isNewUser,
	isOnline,
	lastName,
	macAddress,
	messageId,
	messages,
	messagesItem,
	messageText,
	onlineClients,
	participantId,
	participants,
	participantsItem,
	phoneNumber,
	pong,
	privateChats,
	privateChatsItem,
	publicData,
	senderId,
	sessionId,
	sessions,
	status,
	userData,
	userId,
	username,
	verificationCode,
	welcomeMessage,
};

export namespace BaseSchema {
	export type AvatarSrc = z.infer<typeof avatarSrc>;
	export type Bio = z.infer<typeof bio>;
	export type Blacklist = z.infer<typeof blacklist>;
	export type BlacklistItem = z.infer<typeof blacklistItem>;
	export type BlockedUser = z.infer<typeof blockedUser>;
	export type Cellphone = z.infer<typeof cellphone>;
	export type ChatId = z.infer<typeof chatId>;
	export type ClientUser = z.infer<typeof clientUser>;
	export type Contacts = z.infer<typeof contacts>;
	export type ContactsItem = z.infer<typeof contactsItem>;
	export type Countries = z.infer<typeof countries>;
	export type CountriesItem = z.infer<typeof countriesItem>;
	export type CountryCode = z.infer<typeof countryCode>;
	export type CountryName = z.infer<typeof countryName>;
	export type CountryShortName = z.infer<typeof countryShortName>;
	export type CreatedAt = z.infer<typeof createdAt>;
	export type DBUserData = z.infer<typeof DBUserData>;
	export type EncryptedSession = z.infer<typeof encryptedSession>;
	export type FirstName = z.infer<typeof firstName>;
	export type FullName = z.infer<typeof fullName>;
	export type IsActive = z.infer<typeof isActive>;
	export type IsNewUser = z.infer<typeof isNewUser>;
	export type IsOnline = z.infer<typeof isOnline>;
	export type LastName = z.infer<typeof lastName>;
	export type MacAddress = z.infer<typeof macAddress>;
	export type MessageId = z.infer<typeof messageId>;
	export type MessageText = z.infer<typeof messageText>;
	export type Messages = z.infer<typeof messages>;
	export type MessagesItem = z.infer<typeof messagesItem>;
	export type OnlineClients = z.infer<typeof onlineClients>;
	export type ParticipantId = z.infer<typeof participantId>;
	export type Participants = z.infer<typeof participants>;
	export type ParticipantsItem = z.infer<typeof participantsItem>;
	export type PhoneNumber = z.infer<typeof phoneNumber>;
	export type Pong = z.infer<typeof pong>;
	export type PrivateChats = z.infer<typeof privateChats>;
	export type PrivateChatsItem = z.infer<typeof privateChatsItem>;
	export type PublicData = z.infer<typeof publicData>;
	export type SenderId = z.infer<typeof senderId>;
	export type SessionId = z.infer<typeof sessionId>;
	export type Sessions = z.infer<typeof sessions>;
	export type Status = z.infer<typeof status>;
	export type UserData = z.infer<typeof userData>;
	export type UserId = z.infer<typeof userId>;
	export type Username = z.infer<typeof username>;
	export type VerificationCode = z.infer<typeof verificationCode>;
	export type WelcomeMessage = z.infer<typeof welcomeMessage>;
}

export type BaseSchemaName = keyof typeof baseSchema;
