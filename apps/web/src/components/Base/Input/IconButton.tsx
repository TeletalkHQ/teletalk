import { IconButtonProps, IconButton as MuiIconButton } from "@mui/material";

const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};

export default IconButton;
