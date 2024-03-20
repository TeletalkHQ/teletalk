import { MenuProps, Menu as MuiMenu } from "@mui/material";

const Menu: React.FC<MenuProps> = (props) => {
  return <MuiMenu {...props} />;
};

export default Menu;
