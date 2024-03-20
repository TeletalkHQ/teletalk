import { OnChangeValidatorFn } from "~/types";

import FirstName from "./FirstName";
import LastName from "./LastName";

interface Props {
  onFirstNameInputChange: OnChangeValidatorFn;
  onLastNameInputChange: OnChangeValidatorFn;
  firstName: string;
  lastName: string;
}

const FullName: React.FC<Props> = ({
  firstName,
  lastName,
  onFirstNameInputChange,
  onLastNameInputChange,
}) => {
  return (
    <>
      <FirstName value={firstName} onChange={onFirstNameInputChange} />
      <LastName value={lastName} onChange={onLastNameInputChange} />
    </>
  );
};

export default FullName;
