import { Box } from "~/components";
import { DialogName, VoidWithArg } from "~/types";

import { PrivacyAndSecurityListItem } from "../type";

interface Props {
  item: PrivacyAndSecurityListItem;
  onItemClick: VoidWithArg<DialogName>;
}

const ListItem: React.FC<Props> = ({ item, onItemClick }) => (
  <Box.ListItemButton
    style={{
      display: "flex",
      height: "65px",
      borderRadius: "10px",
      gap: 10,
      alignItems: "center",
    }}
    onClick={() => onItemClick(item.name)}
  >
    <Box.Span
      style={{
        marginTop: "5px",
      }}
    >
      <item.Icon />
    </Box.Span>
    <Box.Span>{item.displayName}</Box.Span>
  </Box.ListItemButton>
);

export default ListItem;
