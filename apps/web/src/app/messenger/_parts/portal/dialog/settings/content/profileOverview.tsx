import { useUserInfo } from "@repo/hooks";
import { Avatar } from "@repo/ui/box/Avatar";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Typography } from "@repo/ui/typography/typography";

export const ProfileOverview: React.FC = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	return (
		<Flex ai="center" gap={2}>
			<Div>
				<Avatar src={userInfo.avatarSrc} style={{ width: 80, height: 80 }} />
			</Div>

			<Flex col>
				<Typography
					fontWeight={"bold"}
					style={{
						fontSize: 20,
					}}
				>
					{/* TODO: Make fn */}
					{userInfo.firstName} {userInfo.lastName}
				</Typography>

				<Div
					style={{
						fontSize: 14,
					}}
				>
					{/* TODO: Make fn */}+{userInfo.countryCode} {userInfo.phoneNumber}
				</Div>

				{userInfo.username && (
					<Div
						style={{
							fontSize: 16,
						}}
					>
						<Typography variant="caption">@{userInfo.username}</Typography>
					</Div>
				)}
			</Flex>
		</Flex>
	);
};
