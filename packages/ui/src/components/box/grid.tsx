import type { GridProps } from "@mui/material";
import { Grid as MuiGrid } from "@mui/material";

export const Grid: React.FC<GridProps> = (props) => {
	return <MuiGrid {...props} />;
};
