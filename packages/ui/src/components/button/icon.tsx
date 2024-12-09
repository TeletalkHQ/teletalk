import type { IconButtonProps } from "@mui/material";
import { IconButton as MuiIconButton } from "@mui/material";

export const IconButton: React.FC<IconButtonProps> = (props) => {
	return <MuiIconButton {...props} />;
};
