import { CustomLoadingButtonProps } from "~/types";

import PrimaryConfirmButton from "./PrimaryConfirm";

interface Props extends Omit<CustomLoadingButtonProps, "children"> {}

const SecondaryConfirmButton: React.FC<Props> = (props) => {
  return <PrimaryConfirmButton {...props} color="error" />;
};

export default SecondaryConfirmButton;
