import { BaseComponent } from "~/components/Base";
import { CustomLoadingButtonProps } from "~/types";

interface Props extends CustomLoadingButtonProps {}

const SecondaryButton: React.FC<Props> = (props) => (
  <BaseComponent.Input.LoadingButton {...props} color="error" />
);

export default SecondaryButton;
