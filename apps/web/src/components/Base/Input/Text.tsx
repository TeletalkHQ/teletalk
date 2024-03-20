import { TextField, TextFieldProps } from "@mui/material";

import { ElementId, ElementLabel, ElementName } from "~/types";

interface Props extends Omit<TextFieldProps, ""> {
  label?: ElementLabel;
  m?: TextFieldProps["margin"];
  name?: ElementName;
  id?: ElementId;
}

const Text: React.FC<Props> = ({ m = "dense", ...rest }) => {
  return (
    <TextField
      fullWidth
      margin={m || rest.margin}
      {...rest}
      InputProps={{
        ...rest.InputProps,
        sx: { borderRadius: "10px", ...(rest.InputProps?.sx || {}) },
      }}
    />
  );
};

export default Text;
