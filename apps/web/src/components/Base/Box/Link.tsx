import { LinkProps, Link as MuiLink } from "@mui/material";

const Link: React.FC<LinkProps> = (props) => {
  return <MuiLink {...props} />;
};

export default Link;
