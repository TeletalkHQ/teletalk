import { Box, Button, Icon, Input, Progress } from "~/components";
import { useEmitter } from "~/hooks";
import { useMessageStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const MessageInput = () => {
  const messageStore = useMessageStore();
  const { handler, loading } = useEmitter("sendMessage");

  const handleInputChange = (event: CommonChangeEvent) => {
    messageStore.messageInputOnChange(event.target.value);
  };

  const handleSendMessage = () => {
    handler.emitFull(
      {
        messageText: messageStore.messageInputTextValue,
        targetParticipantId: messageStore.selectedChatInfo.userId,
      },
      () => {
        messageStore.messageInputOnChange("");
      }
    );
  };

  return (
    <Box.Paper style={{ borderRadius: 0 }}>
      <Box.Flex ai="center" gap={1} jc="space-between" style={{ padding: 5 }}>
        <Box.Div>
          <Button.Icon onClick={() => {}}>
            <Icon.AttachFile.Element />
          </Button.Icon>
        </Box.Div>

        <Box.Div style={{ width: "100%" }}>
          <Input.Base.Text
            autoFocus
            maxRows={8}
            multiline
            placeholder={
              !messageStore.messageInputTextValue ? "Message..." : " "
            }
            value={messageStore.messageInputTextValue}
            onChange={handleInputChange}
          />
        </Box.Div>

        <Box.Div>
          <Button.Icon>
            <Icon.EmojiEmotions.Element />
          </Button.Icon>
        </Box.Div>

        <Box.Div>
          {messageStore.messageInputTextValue ? (
            <Button.Icon onClick={() => !loading && handleSendMessage()}>
              {loading ? (
                <Progress.Circular />
              ) : (
                <Icon.Send.Element color="primary" />
              )}
            </Button.Icon>
          ) : (
            <>
              <Button.Icon
                onClick={() => {
                  console.debug("Mic clicked");
                }}
              >
                <Icon.MicNone.Element />
              </Button.Icon>
            </>
          )}
        </Box.Div>
      </Box.Flex>
    </Box.Paper>
  );
};

export default MessageInput;
