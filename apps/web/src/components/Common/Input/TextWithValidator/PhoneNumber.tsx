import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  onChange: OnChangeValidatorFn;
  value: unknown;
}

const PhoneNumber: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator("phoneNumber", onChange);

  return (
    <BaseComponent.Input.Text
      autoComplete="tel-national"
      label="Phone Number"
      name="phoneNumber"
      required
      style={{ marginLeft: "5px" }}
      value={value}
      onChange={handleChange}
    />
  );
};

export default PhoneNumber;
