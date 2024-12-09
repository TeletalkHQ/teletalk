import type { BackdropProps } from "@mui/material";
import { Backdrop as MuiBackdrop } from "@mui/material";

export const Backdrop: React.FC<BackdropProps> = (props) => {
	return <MuiBackdrop {...props} />;
};
