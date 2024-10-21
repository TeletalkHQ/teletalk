import { FIELD_TYPE } from "@repo/constants";
import { BaseSchema, baseSchema } from "@repo/schema";
import { VoidWithArg } from "@repo/types";
import { expect } from "chai";
import { ZodSchema, z } from "zod";

export interface AssertionValues<
	TestValue extends z.infer<ZodSchema>,
	EqualValue = TestValue,
> {
	equal?: TestValue;
	test: EqualValue;
}

export class Assertion {
	private singleInitializer<T extends ZodSchema>(schema: T) {
		return (values: AssertionValues<z.infer<T>>) => {
			if ("equalValue" in this) expect(values.equal).to.be.equal(values.test);

			schema.parse(values.test);

			return this;
		};
	}

	private multiInitializer<T extends z.infer<ZodSchema>>(
		cb: VoidWithArg<AssertionValues<T>>
	) {
		return (arg: AssertionValues<T>) => {
			cb(arg);
			return this;
		};
	}

	avatarSrc = this.singleInitializer(baseSchema.avatarSrc);
	isActive = this.singleInitializer(baseSchema.isActive);
	bio = this.singleInitializer(baseSchema.bio);
	chatId = this.singleInitializer(baseSchema.chatId);
	createdAt = this.singleInitializer(baseSchema.createdAt);
	sessionId = this.singleInitializer(baseSchema.sessionId);
	countryCode = this.singleInitializer(baseSchema.countryCode);
	countryName = this.singleInitializer(baseSchema.countryName);
	firstName = this.singleInitializer(baseSchema.firstName);
	lastName = this.singleInitializer(baseSchema.lastName);
	messageId = this.singleInitializer(baseSchema.messageId);
	messageText = this.singleInitializer(baseSchema.messageText);
	phoneNumber = this.singleInitializer(baseSchema.phoneNumber);
	senderId = this.singleInitializer(baseSchema.senderId);
	userId = this.singleInitializer(baseSchema.userId);
	username = this.singleInitializer(baseSchema.username);
	verificationCode = this.singleInitializer(baseSchema.signInCode);

	blacklist = this.multiInitializer<BaseSchema.Blacklist>((values) => {
		expect(values.test).to.be.an(FIELD_TYPE.ARRAY);

		const testValue = baseSchema.blacklist.parse(values.test);

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundBlacklist = baseSchema.blacklistItem.parse(
					testValue.find((i) => i.userId === item.userId)
				);

				this.userId({
					equal: item.userId,
					test: foundBlacklist.userId,
				});
			});
		}
	});

	sessions = this.multiInitializer<BaseSchema.Sessions>((values) => {
		const testValue = baseSchema.sessions.parse(values.test);

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundClient = baseSchema.sessionItem.parse(
					testValue.find((i) => i.sessionId === item.sessionId)
				);

				this.sessionId({
					equal: item.sessionId,
					test: foundClient.sessionId,
				});
			});
		}
	});

	contacts = this.multiInitializer<BaseSchema.Contacts>((values) => {
		const testValue = baseSchema.contacts.parse(values.test);

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundContact = baseSchema.contactsItem.parse(
					testValue.find((c) => c.userId === item.userId)
				);

				this.oneContact({
					equal: item,
					test: foundContact,
				});
			});
		}
	});

	oneContact = this.multiInitializer<BaseSchema.ContactsItem>((values) => {
		const testValue = baseSchema.contactsItem.parse(values.test);

		if (values.equal) {
			this.firstName({
				test: testValue.firstName,
				equal: values.equal.firstName,
			});

			if (testValue.lastName) {
				this.lastName({
					test: testValue.lastName,
					equal: values.equal.lastName,
				});
			}

			if (testValue.countryCode) {
				this.countryCode({
					test: testValue.countryCode,
					equal: values.equal.countryCode,
				});
			}
			if (testValue.countryName) {
				this.countryName({
					test: testValue.countryName,
					equal: values.equal.countryName,
				});
			}
			if (testValue.phoneNumber) {
				this.phoneNumber({
					test: testValue.phoneNumber,
					equal: values.equal.phoneNumber,
				});
			}

			this.userId({
				equal: values.equal.userId,
				test: testValue.userId,
			});
		}
	});

	privateChats = this.multiInitializer<BaseSchema.PrivateChats>((values) => {
		const testValue = baseSchema.privateChats.parse(values.test);
		//TODO: add all parts

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundChat = baseSchema.privateChatsItem.parse(
					testValue.find((j) => j.chatId === item.chatId)
				);

				this.onePrivateChat({ test: foundChat, equal: item });
			});
		}
	});

	onePrivateChat = this.multiInitializer<BaseSchema.PrivateChatsItem>(
		(values) => {
			const testValue = baseSchema.privateChatsItem.parse(values.test);

			if (values.equal) {
				this.chatId({
					test: testValue.chatId,
					equal: values.equal.chatId,
				});
				this.createdAt({
					test: testValue.createdAt,
					equal: values.equal.createdAt,
				});
				this.privateChatMessages({
					test: testValue.messages,
					equal: values.equal.messages,
				});
				this.participants({
					test: testValue.participants,
					equal: values.equal.participants,
				});
			}
		}
	);

	privateChatMessages = this.multiInitializer<BaseSchema.Messages>((values) => {
		const testValue = baseSchema.messages.parse(values.test);

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundMessage = baseSchema.messagesItem.parse(
					testValue.find((j) => j.messageId === item.messageId)
				);

				this.oneMessage({
					test: foundMessage,
					equal: item,
				});
			});
		}
	});

	oneMessage = this.multiInitializer<BaseSchema.MessagesItem>((values) => {
		const testValue = baseSchema.messagesItem.parse(values.test);

		if (values.equal) {
			this.messageText({
				test: testValue.messageText,
				equal: values.equal.messageText,
			});

			this.messageId({
				test: testValue.messageId,
				equal: values.equal.messageId,
			});

			this.userId({
				test: testValue.sender.senderId,
				equal: values.equal.sender.senderId,
			});

			this.createdAt({
				test: testValue.createdAt,
				equal: values.equal.createdAt,
			});
		}
	});

	participants = this.multiInitializer<BaseSchema.Participants>((values) => {
		const testValue = baseSchema.participants.parse(values.test);

		if (values.equal) {
			values.equal.forEach((item) => {
				const foundParty = baseSchema.participantsItem.parse(
					testValue.find((j) => j.participantId === item.participantId)
				);

				this.oneParticipant({
					test: foundParty,
					equal: item,
				});
			});
		}
	});

	oneParticipant = this.multiInitializer<BaseSchema.ParticipantsItem>(
		(values) => {
			const testValue = baseSchema.participantsItem.parse(values.test);

			if (values.equal) {
				this.userId({
					test: testValue.participantId,
					equal: values.equal.participantId,
				});
			}
		}
	);

	cellphone = this.multiInitializer<BaseSchema.Cellphone>((values) => {
		const testValue = baseSchema.cellphone.parse(values.test);

		if (values.equal) {
			this.countryCode({
				equal: values.equal.countryCode,
				test: testValue.countryCode,
			});
			this.countryName({
				equal: values.equal.countryName,
				test: testValue.countryName,
			});
			this.phoneNumber({
				equal: values.equal.phoneNumber,
				test: testValue.phoneNumber,
			});
		}
	});

	fullName = this.multiInitializer<BaseSchema.FullName>((values) => {
		const testValue = baseSchema.fullName.parse(values.test);

		if (values.equal) {
			this.firstName({
				equal: values.equal.firstName,
				test: testValue.firstName,
			});

			this.lastName({
				equal: values.equal.lastName,
				test: testValue.lastName,
			});
		}
	});

	userInfo = this.multiInitializer<BaseSchema.UserInfo>((values) => {
		const testValue = baseSchema.userInfo.parse(values.test);

		if (values.equal) {
			this.avatarSrc({
				equal: values.equal.avatarSrc,
				test: testValue.avatarSrc,
			});

			this.userPublicInfo(values);

			this.blacklist({
				equal: values.equal.blacklist,
				test: testValue.blacklist,
			});

			this.cellphone(values);

			this.contacts({
				equal: values.equal.contacts,
				test: testValue.contacts,
			});

			this.createdAt({
				equal: values.equal.createdAt,
				test: testValue.createdAt,
			});

			this.userStatus({
				equal: values.equal.status,
				test: testValue.status,
			});
		}
	});

	userStatus = this.multiInitializer<BaseSchema.Status>((values) => {
		const testValue = baseSchema.status.parse(values.test);

		if (values.equal) {
			this.isActive({
				test: testValue.isActive,
				equal: values.equal.isActive,
			});
		}
	});

	dbUserData = this.multiInitializer<BaseSchema.DBUserData>((values) => {
		const testValue = baseSchema.DBUserData.parse(values.test);

		if (values.equal) {
			this.userInfo(values);

			this.sessions({
				test: testValue.sessions,
				equal: values.equal.sessions,
			});
		}
	});

	userPublicInfo = this.multiInitializer<BaseSchema.UserPublicInfo>(
		(values) => {
			const testValue = baseSchema.userPublicInfo.parse(values.test);

			if (values.equal) {
				this.bio({
					test: testValue.bio,
					equal: values.equal.bio,
				});

				this.fullName({
					equal: values.equal,
					test: testValue,
				});

				this.userId({
					test: testValue.userId,
					equal: values.equal.userId,
				});

				this.username({
					test: testValue.username,
					equal: values.equal.username,
				});
			}
		}
	);
}

export const assertion = () => new Assertion();
