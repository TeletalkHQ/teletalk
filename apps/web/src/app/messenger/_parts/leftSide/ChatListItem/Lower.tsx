import { BaseSchema } from "@repo/schema";
import { Div, Flex, PushPinTwoToneIcon, Typography } from "@repo/ui";

interface Props {
	messageText: BaseSchema.MessageText;
}
export const Lower: React.FC<Props> = ({ messageText }) => (
	<Flex ai="center" jc="space-between" style={{ width: "100%" }}>
		<Typography variant="caption">{messageText}</Typography>
		<Div>
			<PushPinTwoToneIcon fontSize="medium" />
		</Div>
	</Flex>
);
