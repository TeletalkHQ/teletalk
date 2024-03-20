import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const LastName: React.FC<Props> = ({ value, onChange, required }) => {
  const handleChange = utils.createOnChangeValidator("lastName", onChange);

  return (
    <BaseComponent.Input.Text
      id="lastName"
      label="Last Name"
      name="lastName"
      required={required}
      value={value}
      onChange={handleChange}
    />
  );
};

export default LastName;
