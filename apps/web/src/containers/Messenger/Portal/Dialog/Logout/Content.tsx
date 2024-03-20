import { Box, Typography } from "~/components";

const Content = () => (
  <>
    <Box.Div style={{ textAlign: "center", fontSize: 18 }}>
      <Box.Span>Are you sure you want to</Box.Span>{" "}
      <Typography.Bold>logout</Typography.Bold>
      <Box.Span>?</Box.Span>
    </Box.Div>
  </>
);

export default Content;
