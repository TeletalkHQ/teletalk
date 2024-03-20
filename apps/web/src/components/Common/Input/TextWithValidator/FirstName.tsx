import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const FirstName: React.FC<Props> = ({ value, onChange, required = true }) => {
  const handleChange = utils.createOnChangeValidator("firstName", onChange);

  return (
    <BaseComponent.Input.Text
      autoFocus
      id="firstName"
      label="First Name"
      name="firstName"
      required={required}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FirstName;
