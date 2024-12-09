import type { PaperProps } from "@mui/material";
import { Paper as MuiPaper } from "@mui/material";

export const Paper: React.FC<PaperProps> = (props) => {
	return <MuiPaper {...props} />;
};
