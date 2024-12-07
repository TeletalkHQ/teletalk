import { BoxProps, Box as MainBox } from "@mui/material";

interface Props extends BoxProps {}

export const Box: React.FC<Props> = (props) => {
	return <MainBox {...props} />;
};
