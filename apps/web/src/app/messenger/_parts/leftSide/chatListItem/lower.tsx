import { type BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { Typography } from "@repo/ui/typography/typography";
import { FaCheckDouble } from "react-icons/fa6";

interface Props {
	messageText: BaseSchema.MessageText;
}
export const Lower: React.FC<Props> = ({ messageText }) => (
	<Flex ai="center" jc="space-between" style={{ width: "100%" }}>
		<Typography variant="caption">{messageText}</Typography>
		<Div>
			<DynamicIcon icon={FaCheckDouble} />
		</Div>
	</Flex>
);
