import { MenuItemProps, MenuItem as MuiMenuItem } from "@mui/material";

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return <MuiMenuItem {...props} />;
};

export default MenuItem;
