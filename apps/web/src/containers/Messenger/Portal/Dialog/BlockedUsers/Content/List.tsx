import type { UserId } from "teletalk-type-store";

import { Box } from "~/components";
import { useUserStore } from "~/store";
import { VoidWithArg } from "~/types";

import ListItem from "./ListItem";

interface Props {
  onItemLick: VoidWithArg<UserId>;
}

const List: React.FC<Props> = ({ onItemLick }) => {
  const userStore = useUserStore();

  return (
    <Box.List>
      {userStore.users
        .filter((item) => item.isBlocked)
        .map((item, index) => (
          <ListItem
            key={index}
            userItem={item}
            onItemLick={() => onItemLick(item.userId)}
          />
        ))}
    </Box.List>
  );
};

export default List;
