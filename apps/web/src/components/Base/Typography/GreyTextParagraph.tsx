//REFACTOR: Change component name to base
import { TypographyProps } from "@mui/material";

import { Typography } from ".";

const GreyTextParagraph: React.FC<TypographyProps> = (props) => {
  return <Typography.Base {...props} color="GrayText" variant="subtitle1" />;
};

export default GreyTextParagraph;
