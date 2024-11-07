import { userUtils } from "@repo/classes";
import type { AvatarSrc, VoidNoArgs } from "@repo/types";
import { Box } from "@repo/ui";

import { SettingsStore } from "~/store";

import { EditProfileListItemOnClick } from "../types";
import Header from "./Header";
import List from "./List";

interface Props {
	avatarSrc: AvatarSrc;
	onAvatarClick: VoidNoArgs;
	onClick: EditProfileListItemOnClick;
	profile: SettingsStore.Profile;
}

export const Content: React.FC<Props> = ({
	avatarSrc,
	onAvatarClick,
	onClick,
	profile,
}) => {
	const fullName = userUtils.concatFirstNameWithLastName(profile);
	const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(profile);

	return (
		<>
			<Box.Flex
				ai="center"
				col
				gap={1}
				jc="center"
				style={{ maxWidth: "400px" }}
			>
				<Header
					avatarSrc={avatarSrc}
					fullName={fullName}
					onAvatarClick={onAvatarClick}
				/>

				<List
					bio={profile.bio}
					fullName={fullName}
					fullNumber={fullNumber}
					username={profile.username}
					onClick={onClick}
				/>
			</Box.Flex>
		</>
	);
};

export default Content;
