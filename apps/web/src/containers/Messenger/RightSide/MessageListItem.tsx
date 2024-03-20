import DoneAllIcon from "@mui/icons-material/DoneAll";

import { Box, Typography } from "~/components";
// import { SlideProps } from "@mui/material";
import { Style } from "~/types";

interface Props {
  chatDate: string;
  justify: Style["justifyContent"];
  message: string;
  messageTime: string;
  // transitionDirection: SlideProps["direction"];
}

const MessageListItem: React.FC<Props> = ({
  chatDate,
  // transitionDirection,
  justify,
  message,
  messageTime,
}) => {
  return (
    <>
      <Box.Flex justifyContent={justify} style={{ padding: 3 }}>
        {/* <Transitions.Slide
          direction={transitionDirection}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
        <Box.Paper
          style={{ padding: 5, borderRadius: 10 }}
          elevation={0}
          // onContextMenu={(e) => onOtherStateChange(e)}
        >
          <Typography.Base style={{ wordBreak: "break-word" }}>
            {message}
          </Typography.Base>

          <Box.Flex
            alignItems="center"
            gap={0.2}
            justifyContent="flex-end"
            style={{ fontSize: 12 }}
          >
            <Typography.GreyTextParagraph>
              {messageTime || "12:24"}
            </Typography.GreyTextParagraph>
            <Typography.GreyTextParagraph>
              {chatDate}
            </Typography.GreyTextParagraph>
            <Typography.GreyTextParagraph>
              <DoneAllIcon fontSize="small" />
            </Typography.GreyTextParagraph>
          </Box.Flex>
        </Box.Paper>
        {/* </Transitions.Slide> */}
      </Box.Flex>
    </>
  );
};

export default MessageListItem;
