import CircleIcon from "@mui/icons-material/Circle";

import { Status, StatusColors } from "~/types";

import { Box } from "..";

interface Props {
  status: Status;
}

export const statusColors: StatusColors = {
  idle: "white",
  offline: "red",
  online: "green",
  pending: "yellow",
};

const ServerStatusIndicator: React.FC<Props> = ({ status }) => {
  return (
    <Box.Span>
      <CircleIcon
        style={{
          fontSize: "12px",
          color: statusColors[status],
          margin: "0px 4px",
        }}
      />
    </Box.Span>
  );
};

export default ServerStatusIndicator;
