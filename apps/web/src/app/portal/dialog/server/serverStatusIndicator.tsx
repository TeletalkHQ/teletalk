import { type ServerAvailabilityStatusType } from "@repo/hooks/usePing";
import { Span } from "@repo/ui/box/span";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { FaCircle } from "react-icons/fa";

interface Props {
	status: ServerAvailabilityStatusType;
}

export type StatusColors = Record<ServerAvailabilityStatusType, string>;

export const statusColors: StatusColors = {
	idle: "white",
	offline: "red",
	online: "green",
	pending: "yellow",
};

export const ServerStatusIndicator: React.FC<Props> = ({ status }) => {
	return (
		<Span>
			<DynamicIcon
				icon={FaCircle}
				style={{
					fontSize: "12px",
					color: statusColors[status],
					margin: "0px 4px",
				}}
			/>
		</Span>
	);
};
