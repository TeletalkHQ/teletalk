import { ListItemProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import type { CountryItem } from "teletalk-type-store";
import { countries } from "utility-store/lib/variables/countries";

import { OnChangeValidatorFn, SelectedCountry, VoidWithArg } from "~/types";
import { utils } from "~/utils";

import Option from "./Option";
import SelectorInput from "./SelectorInput";

export type SelectCountryOnChange = VoidWithArg<SelectedCountry>;

interface Props {
  countryCode: string;
  countryName: string;
  countryNameOnChange: OnChangeValidatorFn;
  onSelectChange: SelectCountryOnChange;
}

const CountrySelector: React.FC<Props> = ({
  countryCode,
  countryName,
  countryNameOnChange,
  onSelectChange,
}) => {
  const getOptionLabel = (option: CountryItem) => option.countryName;

  const handleCountryNameOnChange = utils.createOnChangeValidator(
    "countryName",
    (value: string) => {
      countryNameOnChange(value, {
        target: {
          value,
          name: "countryName",
        },
      });
    }
  );

  const handleSelectCountryOnChange = (
    _e: React.SyntheticEvent,
    newValue: SelectedCountry
  ) => {
    onSelectChange(newValue);
  };

  const renderOption = (props: ListItemProps, option: CountryItem) => (
    <Option key={option.countryName} option={option} props={props} />
  );

  const selectedCountry =
    countries.find((i) => i.countryCode === countryCode) || null;

  return (
    <Autocomplete
      autoHighlight
      fullWidth
      getOptionLabel={getOptionLabel}
      inputValue={countryName}
      options={countries}
      renderInput={SelectorInput}
      renderOption={renderOption}
      value={selectedCountry}
      onChange={handleSelectCountryOnChange}
      onInputChange={handleCountryNameOnChange}
    />
  );
};

export default CountrySelector;
