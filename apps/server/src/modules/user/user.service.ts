import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { extractor } from "@repo/classes";
import { BaseSchema } from "@repo/schema";
import { Model } from "mongoose";

import { EntityFilterer } from "~/types";

import { ErrorStoreService } from "../error-store/error-store.service";
import { User } from "./user.entity";

export type DBUser = EntityFilterer<User>;

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private repo: Model<User>,
		private errorStoreService: ErrorStoreService
	) {}

	async create(userToCreate: Partial<DBUser>) {
		const user = await this.repo.create(userToCreate);
		user.save();
		return user;
	}

	findOne(dataToFind: Partial<DBUser>) {
		return this.repo.findOne(dataToFind);
	}

	findBySessionId(sessionId: BaseSchema.SessionId) {
		return this.repo.findOne({
			["sessions.sessionId"]: sessionId,
		});
	}

	find(dataToFind: Partial<DBUser>) {
		return this.repo.find(dataToFind);
	}

	async getContacts(sessionId: BaseSchema.SessionId) {
		const currentUser = await this.getCurrentUser(sessionId);
		return currentUser.contacts;
	}

	async getCurrentUser(sessionId: BaseSchema.SessionId) {
		const currentUser = await this.findBySessionId(sessionId);

		if (!currentUser)
			this.errorStoreService.throw(
				"unauthorized",
				"CURRENT_USER_NOT_EXIST",
				this.getCurrentUser.name
			);

		return currentUser;
	}

	async getTargetUser(info: Partial<DBUser>) {
		const targetUser = await this.findOne(info);

		if (!targetUser)
			this.errorStoreService.throw(
				"unauthorized",
				"TARGET_USER_NOT_EXIST",
				this.getCurrentUser.name
			);

		return targetUser;
	}

	async throwIfSelfRequested(
		currentUserId: BaseSchema.UserId,
		targetUserId: BaseSchema.UserId
	) {
		if (currentUserId === targetUserId)
			this.errorStoreService.generate("badRequest", "SELF_DATA_REQUESTED");
	}

	async throwIfBlacklistItemExist(
		blacklist: DBUser["blacklist"],
		targetUserId: BaseSchema.UserId
	) {
		const foundItem = blacklist.some((i) => i.userId === targetUserId);
		if (foundItem)
			this.errorStoreService.throw(
				"badRequest",
				"BLACKLIST_ITEM_EXIST",
				this.throwIfBlacklistItemExist.name
			);
	}

	async throwIfBlacklistItemNotExist(
		blacklist: DBUser["blacklist"],
		targetUserId: BaseSchema.UserId
	) {
		const foundItem = blacklist.some((i) => i.userId === targetUserId);
		if (!foundItem)
			this.errorStoreService.throw(
				"badRequest",
				"BLACKLIST_ITEM_NOT_EXIST",
				this.throwIfBlacklistItemNotExist.name
			);
	}

	async addBlock({
		sessionId,
		targetUserId,
	}: {
		sessionId: BaseSchema.SessionId;
		targetUserId: BaseSchema.UserId;
	}) {
		const currentUser = await this.getCurrentUser(sessionId);

		await this.throwIfSelfRequested(currentUser.userId, targetUserId);
		await this.throwIfBlacklistItemExist(currentUser.blacklist, targetUserId);

		const newBlacklist = [...currentUser.blacklist, { userId: targetUserId }];
		await this.update(
			{ userId: currentUser.userId },
			{
				blacklist: newBlacklist,
			}
		);
	}

	async removeBlock({
		sessionId,
		targetUserId,
	}: {
		sessionId: BaseSchema.SessionId;
		targetUserId: BaseSchema.UserId;
	}) {
		const currentUser = await this.getCurrentUser(sessionId);
		await this.throwIfSelfRequested(currentUser.userId, targetUserId);
		await this.throwIfBlacklistItemNotExist(
			currentUser.blacklist,
			targetUserId
		);

		const copyList = [...currentUser.blacklist];
		const index = copyList.findIndex((i) => i.userId === targetUserId);
		copyList.splice(index, 1);

		await this.update(
			{ userId: currentUser.userId },
			{
				blacklist: copyList,
			}
		);
	}

	async throwIfParticipantIsInBlacklist({
		currentUserBlacklist,
		currentUserId,
		targetUserBlacklist,
		targetUserId,
	}: {
		currentUserBlacklist: DBUser["blacklist"];
		currentUserId: BaseSchema.UserId;
		targetUserBlacklist: DBUser["blacklist"];
		targetUserId: BaseSchema.UserId;
	}) {
		const isBlockedFromCurrent = currentUserBlacklist.some(
			(i) => i.userId === targetUserId
		);
		if (isBlockedFromCurrent)
			throw this.errorStoreService.throw(
				"badRequest",
				"TARGET_USER_IS_BLACKLISTED",
				this.throwIfParticipantIsInBlacklist.name
			);

		const isBlockedFromTarget = targetUserBlacklist.some(
			(i) => i.userId === currentUserId
		);
		if (isBlockedFromTarget)
			throw this.errorStoreService.throw(
				"badRequest",
				"CURRENT_USER_IS_BLACKLISTED",
				this.throwIfParticipantIsInBlacklist.name
			);
	}

	async throwIfContactExist(
		currentUserContacts: DBUser["contacts"],
		targetUserId: BaseSchema.UserId
	) {
		if (currentUserContacts.some((i) => i.userId == targetUserId))
			this.errorStoreService.throw(
				"badRequest",
				"CONTACT_ITEM_EXIST",
				this.throwIfContactExist.name
			);
	}

	async addContact({
		sessionId,
		targetUserInfo,
	}: {
		sessionId: BaseSchema.SessionId;
		targetUserInfo: BaseSchema.ContactsItem;
	}) {
		const currentUser = await this.getCurrentUser(sessionId);
		const targetUser = await this.getTargetUser({
			countryCode: targetUserInfo.countryCode,
			countryName: targetUserInfo.countryName,
			phoneNumber: targetUserInfo.phoneNumber,
			userId: targetUserInfo.userId,
		});
		await this.throwIfSelfRequested(currentUser.userId, targetUser.userId);

		await this.throwIfContactExist(currentUser.contacts, targetUser.userId);
		const newContactsItem: DBUser["contacts"][number] = {
			userId: targetUser.userId,
			firstName: targetUserInfo.firstName,
			lastName: targetUserInfo.lastName,
			countryCode: targetUserInfo.countryCode,
			countryName: targetUserInfo.countryName,
			phoneNumber: targetUserInfo.phoneNumber,
			// isCellphoneAccessible: true,
		};
		const newContacts = [...currentUser.contacts, newContactsItem];
		await this.update(
			{ userId: currentUser.userId },
			{
				contacts: newContacts,
			}
		);

		return newContactsItem;
	}

	async removeContact({
		sessionId,
		targetUserId,
	}: {
		sessionId: BaseSchema.SessionId;
		targetUserId: BaseSchema.UserId;
	}) {
		const currentUser = await this.getCurrentUser(sessionId);
		await this.throwIfSelfRequested(currentUser.userId, targetUserId);

		await this.throwIfContactNotExist(currentUser.contacts, targetUserId);
		const copyList = [...currentUser.contacts];
		const index = copyList.findIndex((i) => i.userId === targetUserId);
		copyList.splice(index, 1);
		await this.update(
			{ userId: currentUser.userId },
			{
				contacts: copyList,
			}
		);
	}

	// TODO: Refactor all `throw` methods - return index instead
	async throwIfContactNotExist(
		contacts: DBUser["contacts"],
		targetUserId: BaseSchema.UserId
	) {
		const isContactExist = contacts.some((i) => i.userId === targetUserId);

		if (!isContactExist)
			this.errorStoreService.throw(
				"notFound",
				"CONTACT_ITEM_NOT_EXIST",
				this.removeContact.name
			);
	}

	async update(dataToFind: Partial<DBUser>, dataToUpdate: Partial<DBUser>) {
		const user = await this.findOne(dataToFind);
		if (!user)
			this.errorStoreService.throw("notFound", "USER_NOT_FOUND", [
				UserService.name,
				this.update.name,
			]);

		await user.updateOne(dataToUpdate);
		return user;
	}

	async remove(userToRemove: Partial<DBUser>) {
		const user = await this.findOne(userToRemove);
		if (!user)
			this.errorStoreService.throw("notFound", "USER_NOT_FOUND", [
				UserService.name,
				this.remove.name,
			]);

		await user.deleteOne();
	}

	async isExist(userToFind: Partial<DBUser>) {
		return this.repo.exists(userToFind);
	}

	async addSessionId(
		userId: BaseSchema.UserId,
		sessionId: BaseSchema.SessionId
	) {
		const user = await this.findOne({ userId });
		if (!user)
			this.errorStoreService.throw("notFound", "USER_NOT_FOUND", [
				UserService.name,
				this.addSessionId.name,
			]);

		const sessionItem: BaseSchema.SessionItem = {
			isExpired: false,
			sessionId,
		};

		await user.updateOne({
			sessions: [...user.sessions, sessionItem],
		});
	}

	async getUserInfo(sessionId: BaseSchema.SessionId) {
		const currentUser = await this.getCurrentUser(sessionId);
		return extractor.userInfo(currentUser);
	}

	async getUserPublicInfo(sessionId: BaseSchema.SessionId) {
		const currentUser = await this.getCurrentUser(sessionId);
		return extractor.userPublicInfo(currentUser);
	}

	async updateUserPublicInfo(
		sessionId: BaseSchema.SessionId,
		infoToUpdate: Partial<BaseSchema.UserPublicInfo>
	) {
		const currentUser = await this.getCurrentUser(sessionId);

		const newInfo: BaseSchema.UserPublicInfo = {
			...extractor.userPublicInfo(currentUser),
			...infoToUpdate,
		};

		await this.update({ userId: currentUser.userId }, newInfo);

		return newInfo;
	}

	async updateContact(
		sessionId: BaseSchema.SessionId,
		contactToUpdate: BaseSchema.ContactsItem
	) {
		const currentUser = await this.getCurrentUser(sessionId);

		const copyOfContacts = [...currentUser.contacts];

		await this.throwIfContactNotExist(copyOfContacts, contactToUpdate.userId);
		const index = copyOfContacts.findIndex(
			(item) => item.userId === contactToUpdate.userId
		);

		// TODO: Remove assertion
		const oldContact = copyOfContacts.at(index)!;

		const updatedContact: BaseSchema.ContactsItem = {
			...oldContact,
			...contactToUpdate,
		};

		copyOfContacts.splice(index, 1, updatedContact);

		await this.update(
			{ userId: currentUser.userId },
			{ contacts: copyOfContacts }
		);

		return updatedContact;
	}
}
