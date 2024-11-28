import { BaseSchema } from "@repo/schema";
import type { VoidNoArgs } from "@repo/types";
import { Avatar, Flex, Typography } from "@repo/ui";

interface Props {
	fullName: string;
	avatarSrc: BaseSchema.AvatarSrc;
	onAvatarClick: VoidNoArgs;
}
export const Header: React.FC<Props> = ({
	avatarSrc,
	fullName,
	onAvatarClick,
}) => {
	return (
		<Flex ai="center" col gap={1} jc="center">
			<Avatar
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
		</Flex>
	);
};
