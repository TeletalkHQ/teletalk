import type { DialogActionsProps } from "@mui/material";
import { DialogActions } from "@mui/material";

export const Actions: React.FC<DialogActionsProps> = (props) => {
	return <DialogActions {...props} />;
};
