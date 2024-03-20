import { ButtonProps } from "@mui/material";

import SecondaryTextButton from "./SecondaryText";

interface Props extends ButtonProps {}

const SecondaryCancelButton: React.FC<Props> = (props) => (
  <SecondaryTextButton {...props}>Cancel</SecondaryTextButton>
);

export default SecondaryCancelButton;
