import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  row?: boolean;
  col?: boolean;
  jc?: BoxProps["justifyContent"];
  ai?: BoxProps["alignItems"];
  fd?: BoxProps["flexDirection"];
}

const Flex: React.FC<Props> = ({
  row,
  col,
  jc,
  ai,
  alignItems,
  justifyContent,
  fd,
  flexDirection,
  gap = 0,

  ...props
}) => {
  const boxFlexDirection =
    (row && "row") || (col && "column") || fd || flexDirection || "row";

  const boxJustifyContent = jc || justifyContent || "flex-start";

  const boxAlignItems = ai || alignItems || "flex-start";

  return (
    <Box
      alignItems={boxAlignItems}
      flexDirection={boxFlexDirection}
      gap={gap}
      justifyContent={boxJustifyContent}
      {...props}
      display="flex"
    />
  );
};

export default Flex;
