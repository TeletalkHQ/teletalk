import { Paper as MuiPaper, PaperProps } from "@mui/material";

export const Paper: React.FC<PaperProps> = (props) => {
	return <MuiPaper {...props} />;
};
