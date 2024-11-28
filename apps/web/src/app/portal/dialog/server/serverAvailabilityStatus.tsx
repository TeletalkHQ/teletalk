import { ServerAvailabilityStatusType } from "@repo/hooks";
import { Box } from "@repo/ui";

import { ServerStatusIndicator } from "./serverStatusIndicator";

interface Props {
	status: ServerAvailabilityStatusType;
}

export const ServerAvailabilityStatus: React.FC<Props> = ({ status }) => {
	return (
		<Box.Flex
			bgcolor={(theme) => theme.palette.background.paper}
			borderRadius="10px"
			jc="space-around"
			padding="10px"
			width="100%"
		>
			<Box.Span>Status:</Box.Span>
			<Box.Span style={{ textAlign: "end" }}>
				<ServerStatusIndicator status={status} />
				{status}
			</Box.Span>
		</Box.Flex>
	);
};
