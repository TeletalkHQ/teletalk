import type { FullName } from "teletalk-type-store";

import { Box, Input } from "~/components";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  fullName: FullName;
  onChange: OnChangeValidatorFn;
}

const Content: React.FC<Props> = ({ fullName, onChange }) => {
  return (
    <Box.Flex col>
      <Input.Text.FullName
        firstName={fullName.firstName}
        lastName={fullName.lastName}
        onFirstNameInputChange={onChange}
        onLastNameInputChange={onChange}
      />
    </Box.Flex>
  );
};

export default Content;
