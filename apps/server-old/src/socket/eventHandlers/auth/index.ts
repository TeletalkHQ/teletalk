import { createNewUser } from "./createNewUser";
import { logout } from "./logout";
import { signIn } from "./signIn";
import { verify } from "./verify";

export const authHandlers = {
	createNewUser,
	logout,
	signIn,
	verify,
};
