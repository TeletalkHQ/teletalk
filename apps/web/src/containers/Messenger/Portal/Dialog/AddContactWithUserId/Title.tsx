import { Box, Typography } from "~/components";

const Title = () => {
  return (
    <>
      <Box.Flex ai="center" jc="space-between">
        <Box.Div>
          <Typography.H5>Add Contact</Typography.H5>
        </Box.Div>
        <Box.Div></Box.Div>
      </Box.Flex>
    </>
  );
};

export default Title;
