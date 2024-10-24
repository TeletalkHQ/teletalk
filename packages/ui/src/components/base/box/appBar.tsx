import {
	AppBar as AppBarMui,
	AppBarProps as AppBarPropsMui,
} from "@mui/material";

export interface AppBarProps extends AppBarPropsMui {}

export const AppBar: React.FC<AppBarProps> = (props) => {
	return <AppBarMui {...props} />;
};
