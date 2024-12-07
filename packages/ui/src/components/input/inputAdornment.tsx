import {
	InputAdornmentProps,
	InputAdornment as MuiInputAdornment,
} from "@mui/material";

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
	return <MuiInputAdornment {...props} />;
};
