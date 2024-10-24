import { BoxProps, Box as MainBox } from "@mui/material";

interface Props extends BoxProps {}

export const Base: React.FC<Props> = (props) => {
	return <MainBox {...props} />;
};
