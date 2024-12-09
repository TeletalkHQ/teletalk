import type { TooltipProps } from "@mui/material";
import { Tooltip as MuiTooltip } from "@mui/material";

interface Props extends TooltipProps {}

export const Tooltip: React.FC<Props> = ({ children, ...rest }) => {
	return (
		<MuiTooltip placement="top" {...rest}>
			<span>{children}</span>
		</MuiTooltip>
	);
};
