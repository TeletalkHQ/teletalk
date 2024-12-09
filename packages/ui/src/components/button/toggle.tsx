import type {
	ToggleButtonProps as MuiToggleButtonProps } from "@mui/material";
import {
	ToggleButton as MuiToggleButton
} from "@mui/material";

export interface ToggleButtonProps extends MuiToggleButtonProps {}

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
	return <MuiToggleButton {...props} />;
};
