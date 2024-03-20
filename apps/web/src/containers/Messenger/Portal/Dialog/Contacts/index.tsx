import { Template } from "~/components";
import { useContextMenu, useDialogState } from "~/hooks";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import {
  ContextMenuList,
  DialogName,
  ExtendedOnContextMenu,
  UserItem,
} from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const Contacts = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("contacts");

  const createContextMenuList = ({
    isBlocked,
  }: Partial<UserItem> = {}): ContextMenuList => [
    {
      text: "Edit",
      handler: onContextMenuHandler("editContactWithCellphone"),
    },
    {
      text: "Remove",
      handler: onContextMenuHandler("removeContact"),
    },
    {
      text: `${isBlocked ? "Unblock" : "Block"}`,
      handler: onContextMenuHandler("blockUser"),
    },
  ];

  const onContextMenuHandler = (dn: DialogName) => () => {
    globalStore.closeContextMenu();
    globalStore.openDialog(dn);
  };

  const { onContextMenu } = useContextMenu(createContextMenuList());

  const handleAddContactClick = () => {
    globalStore.openDialog("addContactWithCellphone");
  };

  const handleContactItemClicked = (contact: UserItem) => {
    globalStore.closeDialog();
    messageStore.updateSelectedChatInfo({
      userId: contact.userId,
      chatId: "",
    });
  };

  const handleContextMenu: ExtendedOnContextMenu<UserItem> = (event, u) => {
    userStore.updateSelectedUserIdForActions(u.userId);
    onContextMenu(event, createContextMenuList(u));
  };

  return (
    <Template.Dialog
      actions={
        <Actions
          onAddContactClick={handleAddContactClick}
          onClose={globalStore.closeDialog}
        />
      }
      content={
        <Content
          contacts={userStore.users.filter((i) => i.isContact)}
          onContactItemClicked={handleContactItemClicked}
          onContextMenu={handleContextMenu}
        />
      }
      open={dialogState.open}
      paperStyle={{
        height: "90vh",
      }}
      title={<Title />}
    />
  );
};

export default Contacts;
