import { BoxProps, Box as MainBox } from "@mui/material";

interface Props extends BoxProps {}

const Base: React.FC<Props> = (props) => {
  return <MainBox {...props} />;
};

export default Base;
