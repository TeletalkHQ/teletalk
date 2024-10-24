import { LinkProps, Link as MuiLink } from "@mui/material";

export const Link: React.FC<LinkProps> = (props) => {
	return <MuiLink {...props} />;
};
