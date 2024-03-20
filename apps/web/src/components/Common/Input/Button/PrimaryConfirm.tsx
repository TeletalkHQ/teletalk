import { LoadingButtonProps } from "@mui/lab";

import { BaseComponent } from "~/components/Base";

interface Props extends Omit<LoadingButtonProps, "children"> {
  loadingIndicatorText?: string;
}

const PrimaryConfirmButton: React.FC<Props> = ({
  loadingIndicatorText = "Updating...",
  ...rest
}) => (
  <BaseComponent.Input.LoadingButton
    {...rest}
    loadingIndicatorText={loadingIndicatorText}
  >
    Confirm
  </BaseComponent.Input.LoadingButton>
);

export default PrimaryConfirmButton;
