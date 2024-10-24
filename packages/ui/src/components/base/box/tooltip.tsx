import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

interface Props extends TooltipProps {}

export const Tooltip: React.FC<Props> = ({ children, ...rest }) => {
	return (
		<MuiTooltip placement="top" {...rest}>
			<span>{children}</span>
		</MuiTooltip>
	);
};
