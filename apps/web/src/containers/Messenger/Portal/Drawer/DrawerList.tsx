import { Box, Icon } from "~/components";
import {
  ElementName,
  HTMLDivMouseEvent,
  VoidWithArg,
  VoidWithTwoArgs,
} from "~/types";

const drawerList = [
  { Icon: Icon.Calls, disabled: true },
  { Icon: Icon.Contacts, disabled: false },
  { Icon: Icon.LogoutOutlined, disabled: false },
  { Icon: Icon.NewChannelOutlined, disabled: true },
  { Icon: Icon.NewGroupOutlined, disabled: true },
  { Icon: Icon.NightModeOutlined, disabled: true },
  { Icon: Icon.SettingsOutlined, disabled: false },
];

interface Props {
  toggleDrawer: VoidWithTwoArgs<HTMLDivMouseEvent, boolean>;
  onClick: VoidWithArg<ElementName>;
}

const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
  <Box.List style={{ padding: 10 }}>
    {drawerList.map(({ Icon, disabled }, index) => (
      <Box.ListItemButton
        key={index}
        disabled={disabled}
        style={{
          alignItems: "center",
          borderRadius: "10px",
          height: "40px",
        }}
        onClick={(event) => {
          toggleDrawer(event, false);
          onClick(Icon.name);
        }}
      >
        <Box.ListItemIcon>
          <Icon.Element />
        </Box.ListItemIcon>
        <Box.ListItemText primary={Icon.text} />
      </Box.ListItemButton>
    ))}
  </Box.List>
);

export default DrawerList;
