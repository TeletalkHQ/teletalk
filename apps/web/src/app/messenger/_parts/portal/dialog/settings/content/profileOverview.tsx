import { useUserInfo } from "@repo/hooks";
import { Box, Typography } from "@repo/ui";

export const ProfileOverview: React.FC = () => {
	const {
		data: { userInfo },
	} = useUserInfo();

	return (
		<Box.Flex ai="center" gap={2}>
			<Box.Div>
				<Box.Avatar
					src={userInfo.avatarSrc}
					style={{ width: 80, height: 80 }}
				/>
			</Box.Div>

			<Box.Flex col>
				<Typography
					fontWeight={"bold"}
					style={{
						fontSize: 20,
					}}
				>
					{/* TODO: Make fn */}
					{userInfo.firstName} {userInfo.lastName}
				</Typography>

				<Box.Div
					style={{
						fontSize: 14,
					}}
				>
					{/* TODO: Make fn */}+{userInfo.countryCode} {userInfo.phoneNumber}
				</Box.Div>

				{userInfo.username && (
					<Box.Div
						style={{
							fontSize: 16,
						}}
					>
						<Typography variant="caption">@{userInfo.username}</Typography>
					</Box.Div>
				)}
			</Box.Flex>
		</Box.Flex>
	);
};
