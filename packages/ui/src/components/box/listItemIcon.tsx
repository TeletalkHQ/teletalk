import type {
	ListItemIconProps } from "@mui/material";
import {
	ListItemIcon as MuiListItemIcon,
} from "@mui/material";

export const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
	return <MuiListItemIcon {...props} />;
};
