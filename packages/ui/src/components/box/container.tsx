import type {
	Breakpoint,
	ContainerProps } from "@mui/material";
import {
	Container as MuiContainer,
} from "@mui/material";

interface Props extends ContainerProps {
	mw?: Breakpoint;
}

export const Container: React.FC<Props> = ({ maxWidth, mw, ...rest }) => {
	return <MuiContainer {...rest} maxWidth={mw || maxWidth} />;
};
