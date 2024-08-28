import { models } from "@repo/model";

const deleteAllUsers = async () => {
	await models.database.User.deleteMany();
};

export const userServices = {
	deleteAllUsers,
};
