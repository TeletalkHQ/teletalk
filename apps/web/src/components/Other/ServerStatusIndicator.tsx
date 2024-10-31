import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@repo/ui";

export type ServerAvailabilityStatusType =
	| "idle"
	| "offline"
	| "online"
	| "pending";

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
		<Box.Span>
			<CircleIcon
				style={{
					fontSize: "12px",
					color: statusColors[status],
					margin: "0px 4px",
				}}
			/>
		</Box.Span>
	);
};
