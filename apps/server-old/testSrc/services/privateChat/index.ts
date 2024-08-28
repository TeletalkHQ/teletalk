import { models } from "@repo/model";

const deleteAllPrivateChats = async () => {
	await models.database.PrivateChat.deleteMany();
};

export const privateChatServices = { deleteAllPrivateChats };
