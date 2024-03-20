import { Box, Icon } from "~/components";

const sidebarList = [
  Icon.AllChatsOutlined,
  Icon.UnreadOutlined,
  Icon.PersonalOutlined,
  Icon.ChannelsOutlined,
  Icon.Groups,
  Icon.BotOutlined,
  Icon.EditChatsOutlined,
];

const SideBarList = () => {
  return (
    <>
      <Box.List sx={{ width: "20%" }}>
        {sidebarList.map(({ Element: Icon }, index) => {
          return (
            //TODO: Flex list Item
            <Box.ListItemButton
              key={index}
              selected={index === 4}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "65px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon />
            </Box.ListItemButton>
          );
        })}
      </Box.List>
    </>
  );
};

export default SideBarList;
