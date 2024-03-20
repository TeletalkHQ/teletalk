import {
  ListItemIconProps,
  ListItemIcon as MuiListItemIcon,
} from "@mui/material";

const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  return <MuiListItemIcon {...props} />;
};

export default ListItemIcon;
