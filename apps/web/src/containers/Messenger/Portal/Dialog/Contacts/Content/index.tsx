import { ExtendedOnContextMenu, UserItem, Users, VoidWithArg } from "~/types";

import ListItem from "./ListItem";

interface Props {
  contacts: Users;
  onContactItemClicked: VoidWithArg<UserItem>;
  onContextMenu: ExtendedOnContextMenu<UserItem>;
}

const Content: React.FC<Props> = ({
  contacts,
  onContactItemClicked,
  onContextMenu,
}) => {
  return (
    <>
      {contacts.map((item, index) => (
        <ListItem
          key={index}
          fullName={`${item.firstName} ${item.lastName}`}
          lastSeen=""
          userId={item.userId}
          onContactClick={() => onContactItemClicked(item)}
          onContextMenu={(e) => {
            onContextMenu(e, item);
          }}
        />
      ))}
    </>
  );
};

export default Content;
