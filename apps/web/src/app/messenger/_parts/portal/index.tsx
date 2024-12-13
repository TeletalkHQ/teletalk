import { AvatarSelector } from "./dialog/avatarSelector";
import { AvatarViewer } from "./dialog/avatarViewer";
import { BlockUser } from "./dialog/blockUser";
import { BlockedUsers } from "./dialog/blockedUsers";
import { AddContact } from "./dialog/contact/addContact";
import { EditContact } from "./dialog/contact/editContact";
import { RemoveContact } from "./dialog/contact/removeContact";
import { Contacts } from "./dialog/contacts";
import { DeleteAvatar } from "./dialog/deleteAvatar";
import { EditBio } from "./dialog/editBio";
import { EditFullName } from "./dialog/editFullName";
import { EditUsername } from "./dialog/editUsername";
import { Logout } from "./dialog/logout";
import { MyProfile } from "./dialog/myProfile";
import { PrivacyAndSecurity } from "./dialog/privacyAndSecurity";
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
			<MyProfile />
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
