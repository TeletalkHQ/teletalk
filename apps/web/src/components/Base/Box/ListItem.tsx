import { ListItemProps, ListItem as MuiListItem } from "@mui/material";

const ListItem: React.FC<ListItemProps> = (props) => {
  return <MuiListItem {...props} />;
};

export default ListItem;
