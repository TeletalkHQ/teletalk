import { useUserInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

interface Props {}

export const PersonalData: React.FC<Props> = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	return (
		<Box.Flex
			ai="center"
			col
			gap={1}
			jc="center"
			style={{
				padding: 10,
			}}
		>
			<Box.Div>
				<Box.Avatar src={userInfo.avatarSrc} />
			</Box.Div>
			<Typography
				style={{
					fontSize: 18,
				}}
			>
				{userInfo.firstName} {userInfo.lastName}
			</Typography>
			<Box.Div
				style={{
					fontSize: 14,
				}}
			>
				+{userInfo.countryCode} {userInfo.phoneNumber}
			</Box.Div>
		</Box.Flex>
	);
};
