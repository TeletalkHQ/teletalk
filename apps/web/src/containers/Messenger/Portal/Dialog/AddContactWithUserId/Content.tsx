import type { FullName } from "teletalk-type-store";

import { Box, Input } from "~/components";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  contact: FullName;
  onChange: OnChangeValidatorFn;
}

const Content: React.FC<Props> = ({ contact, onChange }) => {
  return (
    <>
      <Box.Div>
        <Box.Flex col jc="space-between" mt={2}>
          <Input.Text.FullName
            firstName={contact.firstName}
            lastName={contact.lastName}
            onFirstNameInputChange={onChange}
            onLastNameInputChange={onChange}
          />
        </Box.Flex>
      </Box.Div>
    </>
  );
};

export default Content;
