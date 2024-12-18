import { useUserInfo } from "@repo/hooks/useUserInfo";
import { Avatar } from "@repo/ui/box/Avatar";
import { Flex } from "@repo/ui/box/flex";

export const Content: React.FC = () => {
	const {
		data: {
			userInfo: { avatarSrc },
		},
	} = useUserInfo();

	return (
		<Flex
			ai="center"
			col
			jc="center"
			style={{
				width: "100%",
				minWidth: "300px",
				height: "300px",
			}}
		>
			<Avatar
				alt="avatar"
				src={avatarSrc}
				style={{
					borderRadius: "10px",
					height: 200,
					width: 200,
				}}
			/>
		</Flex>
	);
};
