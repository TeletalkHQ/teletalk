import type { AvatarSrc } from "@repo/types";
import { Box, Typography } from "@repo/ui";

interface Props {
	fullNumber: string;
	fullName: string;
	avatarSrc: AvatarSrc;
}

export const PersonalData: React.FC<Props> = ({
	fullName,
	fullNumber,
	avatarSrc,
}) => (
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
			<Box.Avatar src={avatarSrc} />
		</Box.Div>
		<Typography
			style={{
				fontSize: 18,
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
	</Box.Flex>
);
