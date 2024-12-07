import { BaseSchema } from "@repo/schema";
import { Div, Flex, Typography } from "@repo/ui";
import { AccountBoxIcon } from "@repo/ui/accountBox";

interface Props {
	messageText: BaseSchema.MessageText;
}
export const Lower: React.FC<Props> = ({ messageText }) => (
	<Flex ai="center" jc="space-between" style={{ width: "100%" }}>
		<Typography variant="caption">{messageText}</Typography>
		<Div>
			<AccountBoxIcon fontSize="medium" />
		</Div>
	</Flex>
);
