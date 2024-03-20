import { Paper as MuiPaper, PaperProps } from "@mui/material";

const Paper: React.FC<PaperProps> = (props) => {
  return <MuiPaper {...props} />;
};

export default Paper;
