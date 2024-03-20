import { ButtonProps, Button as MuiButton } from "@mui/material";

const Button: React.FC<ButtonProps> = ({
  size = "large",
  fullWidth = true,
  variant = "contained",
  style,
  ...rest
}) => {
  return (
    <MuiButton
      {...rest}
      fullWidth={fullWidth}
      size={size}
      style={{
        borderRadius: "10px",
        ...style,
      }}
      variant={variant}
    />
  );
};

export default Button;
