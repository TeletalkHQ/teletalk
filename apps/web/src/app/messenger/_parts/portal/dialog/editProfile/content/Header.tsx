import type { AvatarSrc, VoidNoArgs } from "@repo/types";
import { Box, Typography } from "@repo/ui";

interface Props {
	fullName: string;
	avatarSrc: AvatarSrc;
	onAvatarClick: VoidNoArgs;
}
export const Header: React.FC<Props> = ({
	avatarSrc,
	fullName,
	onAvatarClick,
}) => {
	return (
		<Box.Flex ai="center" col gap={1} jc="center">
			<Box.Avatar
				src={avatarSrc}
				style={{ width: "100px", height: "100px" }}
				onClick={onAvatarClick}
			/>

			<Typography
				style={{
					fontSize: 20,
				}}
			>
				{fullName}
			</Typography>
			<div id="croppie"></div>
		</Box.Flex>
	);
};
