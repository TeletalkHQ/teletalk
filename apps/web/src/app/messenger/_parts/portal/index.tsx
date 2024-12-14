import { AvatarSelector } from "./dialog/avatarSelector";
import { AvatarViewer } from "./dialog/avatarViewer";
import { BlockUser } from "./dialog/blockUser";
import { BlockedUsers } from "./dialog/blockedUsers";
import { AddContactByPhone } from "./dialog/contact/addContactByPhone";
import { EditContact } from "./dialog/contact/editContact";
import { RemoveContact } from "./dialog/contact/removeContact";
import { Contacts } from "./dialog/contacts";
import { DeleteAvatar } from "./dialog/deleteAvatar";
import { EditBio } from "./dialog/editBio";
import { EditFullName } from "./dialog/editFullName";
import { EditUsername } from "./dialog/editUsername";
import { LogOut } from "./dialog/logout";
import { MyProfile } from "./dialog/myProfile";
import { PrivacyAndSecurity } from "./dialog/privacyAndSecurity";
import { Settings } from "./dialog/settings";
import { UnblockUser } from "./dialog/unblockUser";
import { UserInfo } from "./dialog/userInfo";
import { Drawer } from "./drawer";

export const Portal = () => {
	return (
		<>
			<AddContactByPhone />
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
			<LogOut />
			<PrivacyAndSecurity />
			<RemoveContact />
			<Settings />
			<UnblockUser />
			<UserInfo />
		</>
	);
};
