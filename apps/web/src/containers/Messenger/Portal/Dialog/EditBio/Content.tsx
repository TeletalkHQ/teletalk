import { Box, Input, Typography } from "~/components";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  bio: string;
  onChange: OnChangeValidatorFn;
}

const Content: React.FC<Props> = ({ bio, onChange }) => {
  return (
    <Box.Flex
      col
      style={{
        maxWidth: 400,
      }}
    >
      <Input.Text.Bio value={bio} onChange={onChange} />
      <Typography.GreyTextParagraph>
        any details such as age, occupation or city. Example: 23 y.o. designer
        from San Francisco
      </Typography.GreyTextParagraph>
    </Box.Flex>
  );
};

export default Content;
