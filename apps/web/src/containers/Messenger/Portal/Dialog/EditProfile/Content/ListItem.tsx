import { ListItemButtonProps } from "@mui/material";

import { Box } from "~/components";
import { ElementLabel, IconType, VoidNoArgsFn } from "~/types";

interface Props extends ListItemButtonProps {
  label: ElementLabel;
  onClick: VoidNoArgsFn;
  value: string;
  Icon: IconType;
}

const ListItem: React.FC<Props> = ({
  disabled,
  Icon,
  label,
  onClick,
  value,
  ...rest
}) => (
  <Box.ListItemButton
    {...rest}
    disabled={disabled}
    style={{
      alignItems: "center",
      borderRadius: "10px",
      display: "flex",
      gap: 10,
      height: "65px",
      width: "100%",
    }}
    onClick={onClick}
  >
    <Icon style={{ fontSize: 30 }} />
    <Box.Flex
      jc="space-between"
      style={{
        gap: 10,
        minWidth: 0,
        width: "90%",
      }}
    >
      <Box.Span style={{ minWidth: "50px" }}>{label}</Box.Span>
      <Box.Span
        style={{
          color: "#1976d2",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Box.Span>
    </Box.Flex>
  </Box.ListItemButton>
);

export default ListItem;
