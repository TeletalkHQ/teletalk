import type { BoxProps } from "@mui/material";
import { Box as MainBox } from "@mui/material";

interface Props extends BoxProps {}

export const Box: React.FC<Props> = (props) => {
	return <MainBox {...props} />;
};
