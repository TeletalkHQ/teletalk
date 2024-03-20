import { Button, Icon } from "~/components";
import { useMessageStore } from "~/store";

const ChatBarCloseButton = () => {
  const messageStore = useMessageStore();

  const handleMessageContainerClose = () => {
    messageStore.deselectChat();
  };

  return (
    <Button.Icon
      onClick={(e) => {
        e.stopPropagation();
        handleMessageContainerClose();
      }}
    >
      <Icon.Close.Element />
    </Button.Icon>
  );
};

export default ChatBarCloseButton;
