import { DialogProps, Dialog as MuiDialog } from "@mui/material";

const Dialog: React.FC<DialogProps> = ({ ...props }) => {
  return <MuiDialog {...props} />;
};

export default Dialog;
