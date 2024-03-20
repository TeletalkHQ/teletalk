import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
  required?: boolean;
}

const Username: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator("username", onChange);

  return (
    <BaseComponent.Input.Text
      autoFocus
      InputProps={{
        startAdornment: (
          <BaseComponent.Input.Adornment position="start">
            @
          </BaseComponent.Input.Adornment>
        ),
      }}
      label="Username"
      name="username"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Username;
