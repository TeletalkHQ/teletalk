import { ButtonProps } from "@mui/material";

import PrimaryButton from "./Primary";

interface Props extends ButtonProps {}

const PrimaryTextButton: React.FC<Props> = (props) => (
  <PrimaryButton {...props} variant="text" />
);

export default PrimaryTextButton;
