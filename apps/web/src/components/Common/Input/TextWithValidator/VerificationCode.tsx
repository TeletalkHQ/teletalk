import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const VerificationCode: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator(
    "verificationCode",
    onChange
  );

  return (
    <BaseComponent.Input.Text
      autoFocus
      label="Verification Code"
      name="verificationCode"
      required
      value={value}
      onChange={handleChange}
    />
  );
};

export default VerificationCode;
