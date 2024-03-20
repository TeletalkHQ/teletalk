import { GridProps, Grid as MuiGrid } from "@mui/material";

const Grid: React.FC<GridProps> = (props) => {
  return <MuiGrid {...props} />;
};

export default Grid;
