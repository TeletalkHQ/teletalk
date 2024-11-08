import type { AvatarSrc } from "@repo/types";
import { Box } from "@repo/ui";

interface Props {
	avatarSrc: AvatarSrc;
}

export const Content: React.FC<Props> = ({ avatarSrc }) => {
	return (
		<>
			<Box.Flex
				ai="center"
				col
				jc="center"
				style={{
					width: "100%",
					minWidth: "300px",
					height: "300px",
				}}
			>
				<Box.Avatar
					alt="avatar"
					src={avatarSrc}
					style={{
						borderRadius: "10px",
						height: 200,
						width: 200,
					}}
				/>
			</Box.Flex>
		</>
	);
};
