import { type BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { AccountBoxIcon } from "@repo/ui/icons/accountBox";
import { Typography } from "@repo/ui/typography/typography";

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
