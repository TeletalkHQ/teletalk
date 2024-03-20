import {
  ListItemButtonProps,
  ListItemButton as MuiListItemButton,
} from "@mui/material";

const ListItemButton: React.FC<ListItemButtonProps> = (props) => {
  return <MuiListItemButton {...props} />;
};

export default ListItemButton;
