import { Box } from "~/components";
import { DialogName, VoidWithArg } from "~/types";

import ListItem from "./ListItem";
import { privacyAndSecurityList } from "./data";

interface Props {
  onItemClick: VoidWithArg<DialogName>;
}

const List: React.FC<Props> = ({ onItemClick }) => (
  <Box.List>
    {privacyAndSecurityList.map((item, index) => (
      <ListItem key={index} item={item} onItemClick={onItemClick} />
    ))}
  </Box.List>
);

export default List;
