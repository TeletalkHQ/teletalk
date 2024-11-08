import { BaseSchema } from "@repo/schema";
import { Box, Typography } from "@repo/ui";

interface Props {
	avatarSrc: BaseSchema.AvatarSrc;
	fullName: string;
	fullNumber: string;
	username: BaseSchema.Username;
}

export const ProfileOverview: React.FC<Props> = ({
	avatarSrc,
	fullName,
	fullNumber,
	username,
}) => {
	return (
		<Box.Flex ai="center" gap={2}>
			<Box.Div>
				<Box.Avatar src={avatarSrc} style={{ width: 80, height: 80 }} />
			</Box.Div>

			<Box.Flex col>
				<Typography
					fontWeight={"bold"}
					style={{
						fontSize: 20,
					}}
				>
					{fullName}
				</Typography>

				<Box.Div
					style={{
						fontSize: 14,
					}}
				>
					{fullNumber}
				</Box.Div>

				{username && (
					<Box.Div
						style={{
							fontSize: 16,
						}}
					>
						<Typography variant="greyCaption">@{username}</Typography>
					</Box.Div>
				)}
			</Box.Flex>
		</Box.Flex>
	);
};
