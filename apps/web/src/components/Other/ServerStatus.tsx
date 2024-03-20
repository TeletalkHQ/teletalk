import { Status } from "~/types";

import { Box } from "..";
import ServerStatusIndicator from "./ServerStatusIndicator";

interface Props {
  status: Status;
}

const ServerStatus: React.FC<Props> = ({ status }) => {
  return (
    <Box.Flex
      bgcolor={(theme) => theme.palette.background.paper}
      borderRadius="10px"
      jc="space-around"
      padding="10px"
      width="100%"
    >
      <Box.Span>Status:</Box.Span>
      <Box.Span style={{ textAlign: "end" }}>
        <ServerStatusIndicator status={status} />
        {status}
      </Box.Span>
    </Box.Flex>
  );
};

export default ServerStatus;
