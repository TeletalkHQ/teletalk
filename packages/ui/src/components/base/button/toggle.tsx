import {
	ToggleButton as MuiToggleButton,
	ToggleButtonProps as MuiToggleButtonProps,
} from "@mui/material";

export interface ToggleButtonProps extends MuiToggleButtonProps {}

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
	return <MuiToggleButton {...props} />;
};
