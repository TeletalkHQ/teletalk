import { useUserInfo } from "@repo/hooks";
import { Box } from "@repo/ui";

export const Content: React.FC = () => {
	const {
		data: {
			userInfo: { avatarSrc },
		},
	} = useUserInfo();

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
