import { ServerAvailabilityStatusType } from "@repo/hooks";
import { Flex, Span } from "@repo/ui";

import { ServerStatusIndicator } from "./serverStatusIndicator";

interface Props {
	status: ServerAvailabilityStatusType;
}

export const ServerAvailabilityStatus: React.FC<Props> = ({ status }) => {
	return (
		<Flex
			bgcolor={(theme) => theme.palette.background.paper}
			borderRadius="10px"
			jc="space-around"
			padding="10px"
			width="100%"
		>
			<Span>Status:</Span>
			<Span style={{ textAlign: "end" }}>
				<ServerStatusIndicator status={status} />
				{status}
			</Span>
		</Flex>
	);
};
