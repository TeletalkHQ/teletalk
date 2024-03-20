import { BaseComponent } from "~/components/Base";
import { CustomLoadingButtonProps } from "~/types";

interface Props extends CustomLoadingButtonProps {}

const PrimaryButton: React.FC<Props> = (props) => (
  <BaseComponent.Input.LoadingButton {...props} color="primary" />
);

export default PrimaryButton;
