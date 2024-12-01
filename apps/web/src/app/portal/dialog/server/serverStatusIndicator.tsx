import { ServerAvailabilityStatusType } from "@repo/hooks";
import { CircleIcon, Span } from "@repo/ui";

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
			<CircleIcon
				style={{
					fontSize: "12px",
					color: statusColors[status],
					margin: "0px 4px",
				}}
			/>
		</Span>
	);
};