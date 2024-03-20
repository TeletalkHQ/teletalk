import {
  Breakpoint,
  ContainerProps,
  Container as MuiContainer,
} from "@mui/material";

interface Props extends ContainerProps {
  mw?: Breakpoint;
}

const Container: React.FC<Props> = ({ mw, ...rest }) => {
  return <MuiContainer {...rest} maxWidth={mw || rest.maxWidth} />;
};

export default Container;
