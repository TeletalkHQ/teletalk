import { LoadingButton as MuiLoadingButton } from "@mui/lab";

import { CustomLoadingButtonProps } from "~/types";

import { Box } from "../Box";
import { Progress } from "../Progress";

const LoadingButton: React.FC<CustomLoadingButtonProps> = ({
  size = "large",
  variant = "contained",
  loadingIndicatorText = "",
  ...props
}) => {
  return (
    <MuiLoadingButton
      {...props}
      fullWidth
      loadingIndicator={
        <>
          <Box.Span
            style={{
              color: "white",
            }}
          >
            {loadingIndicatorText}
          </Box.Span>
          <Progress.Circular
            style={{
              marginLeft: 10,
            }}
          />
        </>
      }
      size={size}
      style={{
        borderRadius: "10px",
        ...props.style,
      }}
      variant={variant}
    />
  );
};

export default LoadingButton;
