import {
  ListItemTextProps,
  ListItemText as MuiListItemText,
} from "@mui/material";

const ListItemText: React.FC<ListItemTextProps> = (props) => {
  return <MuiListItemText {...props} />;
};

export default ListItemText;
