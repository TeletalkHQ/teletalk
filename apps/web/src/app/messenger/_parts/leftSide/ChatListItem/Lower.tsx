import { BaseSchema } from "@repo/schema";
import { Box, PushPinTwoToneIcon, Typography } from "@repo/ui";

interface Props {
	messageText: BaseSchema.MessageText;
}
export const Lower: React.FC<Props> = ({ messageText }) => (
	<Box.Flex ai="center" jc="space-between" style={{ width: "100%" }}>
		<Typography variant="caption">{messageText}</Typography>
		<Box.Div>
			<PushPinTwoToneIcon fontSize="medium" />
		</Box.Div>
	</Box.Flex>
);
