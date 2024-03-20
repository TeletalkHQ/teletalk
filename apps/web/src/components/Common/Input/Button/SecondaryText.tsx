import { CustomLoadingButtonProps } from "~/types";

import ErrorButton from "./Secondary";

interface Props extends CustomLoadingButtonProps {}

const SecondaryTextButton: React.FC<Props> = (props) => (
  <ErrorButton {...props} variant="text" />
);

export default SecondaryTextButton;
