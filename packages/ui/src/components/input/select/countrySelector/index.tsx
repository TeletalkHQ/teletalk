import type { ListItemProps } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useCountries } from "@repo/hooks/useCountries";
import { type BaseSchema } from "@repo/schema";
import { type VoidWithArg } from "@repo/types";
import { useMemo } from "react";

import { Option } from "./option";
import { SelectorInput } from "./selectorInput";

export type SelectedCountry = BaseSchema.CountriesItem | null;

export type OnCountrySelectChange = VoidWithArg<SelectedCountry>;
export type OnCountryNameChange = VoidWithArg<string>;

interface Props {
	countryCode: string;
	countryName: string;
	onCountryNameChange: OnCountryNameChange;
	onSelectChange: OnCountrySelectChange;
}

export const CountrySelector: React.FC<Props> = ({
	countryCode,
	countryName,
	onCountryNameChange,
	onSelectChange,
}) => {
	const {
		data: { countries },
	} = useCountries();

	const getOptionLabel = (option: BaseSchema.CountriesItem) =>
		option.countryName;

	const handleSelectCountryOnChange = (
		_e: React.SyntheticEvent,
		newValue: SelectedCountry
	) => {
		onSelectChange(newValue);
	};

	const renderOption = (
		{ key, ...rest }: ListItemProps,
		option: BaseSchema.CountriesItem
	) => (
		<Option
			key={`${option.countryCode}-${option.countryShortName}--${option.countryName}-`}
			option={option}
			props={rest}
		/>
	);

	const foundSelectedCountry = useMemo(
		() => countries.find((i) => i.countryCode === countryCode) || null,
		[countryCode, countries]
	);

	return (
		<Autocomplete
			autoHighlight
			fullWidth
			getOptionLabel={getOptionLabel}
			inputValue={countryName}
			options={countries}
			renderInput={SelectorInput}
			renderOption={renderOption}
			value={foundSelectedCountry}
			onChange={handleSelectCountryOnChange}
			onInputChange={(_e, value) => onCountryNameChange(value)}
		/>
	);
};
