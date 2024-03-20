import { Box, Typography } from "~/components";

const Content = () => (
  <>
    <Box.Div
      style={{
        fontSize: 18,
        textAlign: "center",
      }}
    >
      <Box.Span>Are you sure you want to</Box.Span>{" "}
      <Typography.Bold>delete</Typography.Bold>
      <Box.Span> your avatar?</Box.Span>
    </Box.Div>
  </>
);

export default Content;
