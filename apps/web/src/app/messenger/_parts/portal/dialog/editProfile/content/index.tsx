import { userUtils } from "@repo/classes";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import type { VoidNoArgs } from "@repo/types";
import { Flex } from "@repo/ui/box/flex";

import { Header } from "./Header";
import { List } from "./List";
import { OnProfileItemClick } from "./ListItem";

interface Props {
	onAvatarClick: VoidNoArgs;
	onClick: OnProfileItemClick;
}

export const Content: React.FC<Props> = ({ onAvatarClick, onClick }) => {
	const {
		data: { userInfo },
	} = useUserInfo();

	const fullName = userUtils.concatFirstNameWithLastName(userInfo);
	const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(userInfo);

	return (
		<>
			<Flex ai="center" col gap={1} jc="center" style={{ maxWidth: "400px" }}>
				<Header
					avatarSrc={userInfo.avatarSrc}
					fullName={fullName}
					onAvatarClick={onAvatarClick}
				/>

				<List
					bio={userInfo.bio}
					fullName={fullName}
					fullNumber={fullNumber}
					username={userInfo.username}
					onClick={onClick}
				/>
			</Flex>
		</>
	);
};
