import { countries } from "utility-store/lib/variables/countries";

import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn, SelectedCountry } from "~/types";

import CountrySelector from "../Select/CountrySelector";
import CountryCode from "./CountryCode";
import PhoneNumber from "./PhoneNumber";

interface Props {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
  onChange: OnChangeValidatorFn;
}

const Cellphone: React.FC<Props> = ({
  countryCode,
  countryName,
  onChange,
  phoneNumber,
}) => {
  const handleCountryNameOnChange: OnChangeValidatorFn = (countryName, e) => {
    onChange(countryName, e);
  };

  const handleSelectedCountryOnChange = (value: SelectedCountry) => {
    const { countryCode = "", countryName = "" } = value || {};

    onChange(countryName, {
      target: {
        name: "countryName",
        value: countryName,
      },
    });

    onChange(countryCode, {
      target: {
        name: "countryCode",
        value: countryCode,
      },
    });
  };

  const handleCountryCodeOnChange: OnChangeValidatorFn = (value, e) => {
    const country = countries.find((i) => i.countryCode === value);

    onChange(value, e);
    onChange(country?.countryName || "", e);
  };

  const handlePhoneNumberOnChange: OnChangeValidatorFn = (value, e) => {
    onChange(value, e);
  };

  return (
    <>
      <CountrySelector
        countryCode={countryCode}
        countryName={countryName}
        countryNameOnChange={handleCountryNameOnChange}
        onSelectChange={handleSelectedCountryOnChange}
      />

      <BaseComponent.Box.Flex jc="space-between" style={{ width: "100%" }}>
        <CountryCode value={countryCode} onChange={handleCountryCodeOnChange} />
        <PhoneNumber value={phoneNumber} onChange={handlePhoneNumberOnChange} />
      </BaseComponent.Box.Flex>
    </>
  );
};

export default Cellphone;
