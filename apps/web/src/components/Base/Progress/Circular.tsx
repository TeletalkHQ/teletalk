import {
  CircularProgressProps,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";

const Circular: React.FC<CircularProgressProps> = ({
  size = 20,
  color = "info",
  ...rest
}) => {
  return <MuiCircularProgress {...rest} color={color} size={size} />;
};

export default Circular;
