import { ListItemProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import type { CountryItem, VoidWithArg } from "@repo/types";
import { countries } from "@repo/vars";

import { GlobalStore } from "~/store";

import Option from "./Option";
import SelectorInput from "./SelectorInput";

export type SelectCountryOnChange = VoidWithArg<GlobalStore.SelectedCountry>;

interface Props {
	countryCode: string;
	countryName: string;
}

const CountrySelector: React.FC<Props> = ({ countryCode, countryName }) => {
	const getOptionLabel = (option: CountryItem) => option.countryName;

	const handleSelectCountryOnChange = (_e: React.SyntheticEvent) => {};

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
			// onInputChange={handleCountryNameOnChange}
		/>
	);
};

export default CountrySelector;
