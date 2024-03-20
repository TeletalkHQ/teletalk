import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";
import type { MessageText } from "teletalk-type-store";

import { Box, Typography } from "~/components";

interface Props {
  messageText: MessageText;
}
const Lower: React.FC<Props> = ({ messageText }) => (
  <Box.Flex ai="center" jc="space-between" style={{ width: "100%" }}>
    <Typography.GreyTextParagraph>{messageText}</Typography.GreyTextParagraph>
    <Box.Div>
      <PushPinTwoToneIcon fontSize="medium" />
    </Box.Div>
  </Box.Flex>
);

export default Lower;
