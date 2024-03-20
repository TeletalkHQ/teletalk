import { ButtonProps } from "@mui/material";

import PrimaryTextButton from "./PrimaryText";

interface Props extends ButtonProps {}

const PrimaryCloseButton: React.FC<Props> = (props) => (
  <PrimaryTextButton {...props}>Close</PrimaryTextButton>
);

export default PrimaryCloseButton;
