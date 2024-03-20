import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  value: string;
  onChange: OnChangeValidatorFn;
}

const CountryCode: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = utils.createOnChangeValidator("countryCode", onChange);

  return (
    <BaseComponent.Input.Text
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <>
            <BaseComponent.Box.Span>+</BaseComponent.Box.Span>
          </>
        ),
      }}
      label="Code"
      name="countryCode"
      required
      style={{ width: "90px" }}
      value={value}
      onChange={handleChange}
    />
  );
};

export default CountryCode;
