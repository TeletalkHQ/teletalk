import {
  InputAdornmentProps,
  InputAdornment as MuiInputAdornment,
} from "@mui/material";

const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  return <MuiInputAdornment {...props} />;
};

export default InputAdornment;
