import {
	ListItemTextProps,
	ListItemText as MuiListItemText,
} from "@mui/material";

export const ListItemText: React.FC<ListItemTextProps> = (props) => {
	return <MuiListItemText {...props} />;
};
