import { BackdropProps, Backdrop as MuiBackdrop } from "@mui/material";

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <MuiBackdrop {...props} />;
};

export default Backdrop;
