import ContextMenu from "./contextMenu";
import { AvatarSelector } from "./dialog/avatar/avatarSelector";
import { AvatarViewer } from "./dialog/avatar/avatarViewer";
import { DeleteAvatar } from "./dialog/avatar/deleteAvatar";
import { BlockUser } from "./dialog/block/blockUser";
import { BlockedUsers } from "./dialog/block/blockedUsers";
import { UnblockUser } from "./dialog/block/unblockUser";
import { AddContactByPhone } from "./dialog/contact/addContactByPhone";
import { Contacts } from "./dialog/contact/contacts";
import { EditContact } from "./dialog/contact/editContact";
import { RemoveContact } from "./dialog/contact/removeContact";
import { EditBio } from "./dialog/editBio";
import { EditFullName } from "./dialog/editFullName";
import { EditUsername } from "./dialog/editUsername";
import { LogOut } from "./dialog/logout";
import { MyProfile } from "./dialog/myProfile";
import { PrivacyAndSecurity } from "./dialog/privacyAndSecurity";
import { Settings } from "./dialog/settings";
import { UserInfo } from "./dialog/userInfo";
import { Drawer } from "./drawer";

export const Portal = () => {
	return (
		<>
			<ContextMenu />
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
