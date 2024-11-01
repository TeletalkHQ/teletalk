import type { AvatarSrc, VoidNoArgsFn } from "@repo/types";

import { Box, Typography } from "~/components";

interface Props {
	fullName: string;
	avatarSrc: AvatarSrc;
	onAvatarClick: VoidNoArgsFn;
}
const Header: React.FC<Props> = ({ avatarSrc, fullName, onAvatarClick }) => {
	return (
		<Box.Flex ai="center" col gap={1} jc="center">
			<Box.Avatar
				src={avatarSrc}
				style={{ width: "100px", height: "100px" }}
				onClick={onAvatarClick}
			/>

			<Typography.Bold
				style={{
					fontSize: 20,
				}}
			>
				{fullName}
			</Typography.Bold>
			<div id="croppie"></div>
		</Box.Flex>
	);
};

export default Header;