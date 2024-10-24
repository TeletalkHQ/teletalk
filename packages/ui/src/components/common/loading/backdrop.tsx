import { BackdropProps, Backdrop as MuiBackdrop } from "@mui/material";

export const Backdrop: React.FC<BackdropProps> = (props) => {
	return <MuiBackdrop {...props} />;
};
