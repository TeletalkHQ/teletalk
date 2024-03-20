import { SpanProps } from "~/types";

import { Box } from "../Box";

interface Props extends SpanProps {}

const Bold: React.FC<Props> = ({ style = {}, children, ...rest }) => {
  return (
    <Box.Span
      {...rest}
      style={{
        ...style,
        fontWeight: style?.fontWeight || 600,
      }}
    >
      {children}
    </Box.Span>
  );
};

export default Bold;
