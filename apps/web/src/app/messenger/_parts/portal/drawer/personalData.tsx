import { useUserInfo } from "@repo/hooks";
import { Avatar, Div, Flex, Typography } from "@repo/ui";

interface Props {}

export const PersonalData: React.FC<Props> = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	return (
		<Flex
			ai="center"
			col
			gap={1}
			jc="center"
			style={{
				padding: 10,
			}}
		>
			<Div>
				<Avatar src={userInfo.avatarSrc} />
			</Div>
			<Typography
				style={{
					fontSize: 18,
				}}
			>
				{userInfo.firstName} {userInfo.lastName}
			</Typography>
			<Div
				style={{
					fontSize: 14,
				}}
			>
				+{userInfo.countryCode} {userInfo.phoneNumber}
			</Div>
		</Flex>
	);
};
