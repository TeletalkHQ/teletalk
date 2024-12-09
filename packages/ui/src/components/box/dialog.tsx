import type { DialogProps } from "@mui/material";
import { Dialog as MuiDialog } from "@mui/material";

export const Dialog: React.FC<DialogProps> = ({ ...props }) => {
	return <MuiDialog {...props} />;
};

export type { DialogProps };
