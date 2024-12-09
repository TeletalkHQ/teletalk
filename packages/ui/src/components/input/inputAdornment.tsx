import type {
	InputAdornmentProps } from "@mui/material";
import {
	InputAdornment as MuiInputAdornment,
} from "@mui/material";

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
	return <MuiInputAdornment {...props} />;
};
