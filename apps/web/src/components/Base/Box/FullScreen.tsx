import { DivProps, Style } from "~/types";

import Div from "./Div";

interface Props extends DivProps {
  overrideStyle?: Style;
}

const FullScreen: React.FC<Props> = ({ overrideStyle = {}, ...rest }) => {
  return (
    <Div
      style={{
        ...overrideStyle,
        height: "100vh",
        width: "100vw",
      }}
      {...rest}
    />
  );
};

export default FullScreen;
