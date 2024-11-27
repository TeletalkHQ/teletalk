import { AddContact } from "./dialog/addContact";
import { AvatarSelector } from "./dialog/avatarSelector";
import { AvatarViewer } from "./dialog/avatarViewer";
import { BlockUser } from "./dialog/blockUser";
import { BlockedUsers } from "./dialog/blockedUsers";
import { Contacts } from "./dialog/contacts";
import { DeleteAvatar } from "./dialog/deleteAvatar";
import { EditBio } from "./dialog/editBio";
import { EditContact } from "./dialog/editContact";
import { EditFullName } from "./dialog/editFullName";
import { EditProfile } from "./dialog/editProfile";
import { EditUsername } from "./dialog/editUsername";
import { Logout } from "./dialog/logout";
import { PrivacyAndSecurity } from "./dialog/privacyAndSecurity";
import { RemoveContact } from "./dialog/removeContact";
import { Settings } from "./dialog/settings";
import { UnblockUser } from "./dialog/unblockUser";
import { UserInfo } from "./dialog/userInfo";
import { Drawer } from "./drawer";

export const Portal = () => {
	return (
		<>
			<AddContact />
			<AvatarSelector />
			<AvatarViewer />
			<BlockUser />
			<BlockedUsers />
			<Contacts />
			<DeleteAvatar />
			<Drawer />
			<EditBio />
			<EditContact />
			<EditFullName />
			<EditProfile />
			<EditUsername />
			<Logout />
			<PrivacyAndSecurity />
			<RemoveContact />
			<Settings />
			<UnblockUser />
			<UserInfo />
		</>
	);
};
