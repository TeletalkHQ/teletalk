import { MenuProps, Menu as MuiMenu } from "@mui/material";

export const Menu: React.FC<MenuProps> = (props) => {
	return <MuiMenu {...props} />;
};
