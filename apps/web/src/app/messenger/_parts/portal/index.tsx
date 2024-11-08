// import { AddContactWithCellphone } from "./Dialog/addContact";
// import { AvatarSelector } from "./Dialog/avatarSelector";
// import { AvatarViewer } from "./Dialog/avatarViewer";
// import { BlockUser } from "./Dialog/blockUser";
// import { BlockedUsers } from "./Dialog/blockedUsers";
// import { Contacts } from "./Dialog/contacts";
// import { DeleteAvatar } from "./Dialog/deleteAvatar";
// import { EditBio } from "./Dialog/editBio";
// import { EditContact } from "./Dialog/editContact";
// import { EditFullName } from "./Dialog/editFullName";
// import { EditProfile } from "./Dialog/editProfile";
// import { EditUsername } from "./Dialog/editUsername";
// import { Logout } from "./Dialog/logout";
// import { PrivacyAndSecurity } from "./Dialog/privacyAndSecurity";
// import { RemoveBlock } from "./Dialog/removeBlock";
// import { RemoveContact } from "./Dialog/removeContact";
// import { Settings } from "./Dialog/settings";
// import { UserInfo } from "./Dialog/userInfo";
// import { Drawer } from "./drawer";
import { Logout } from "./dialog/logout";
import { Drawer } from "./drawer";

export const Portal = () => {
	return (
		<>
			<Drawer />

			<Logout />
			{/* 
			<AddContact />
			<AvatarSelector />
			<AvatarViewer />
			<BlockedUsers />
			<BlockUser />
			<Contacts />
			<DeleteAvatar />
			<EditBio />
			<EditContact />
			<EditFullName />
			<EditProfile />
			<EditUsername />
			<PrivacyAndSecurity />
			<RemoveBlock />
			<RemoveContact />
			<Settings />
			<UserInfo /> */}
		</>
	);
};
