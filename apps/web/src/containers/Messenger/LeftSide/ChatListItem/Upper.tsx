import { Box, Typography } from "~/components";

interface Props {
  fullName: string;
}

const Upper: React.FC<Props> = ({ fullName }) => (
  <Box.Flex
    ai="center"
    jc="space-between"
    style={{
      width: "100%",
    }}
  >
    <Typography.Bold>{fullName}</Typography.Bold>
    <Box.Div>
      <Typography.GreyTextParagraph
        style={{
          fontSize: 12,
        }}
      >
        12:38
      </Typography.GreyTextParagraph>
    </Box.Div>
  </Box.Flex>
);

export default Upper;
