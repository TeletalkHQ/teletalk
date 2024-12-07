import { ListItemProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useCountries } from "@repo/hooks";
import { BaseSchema } from "@repo/schema";
import { VoidWithArg } from "@repo/types";
import { useMemo } from "react";

import { Option } from "./option";
import { SelectorInput } from "./selectorInput";

export type SelectedCountry = BaseSchema.CountriesItem | null;

type SelectCountryOnChange = VoidWithArg<SelectedCountry>;

interface Props {
	countryCode: string;
	countryName: string;
	onCountryNameChange: VoidWithArg<string>;
	onSelectChange: SelectCountryOnChange;
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

	const fixedCountries = useMemo(() => {
		return countries.map((item) => ({
			...item,
			country_code: item.countryCode || "N/A",
		}));
	}, [countries]);

	return (
		<Autocomplete
			autoHighlight
			fullWidth
			getOptionLabel={getOptionLabel}
			inputValue={countryName}
			options={fixedCountries}
			renderInput={SelectorInput}
			renderOption={renderOption}
			value={foundSelectedCountry}
			onChange={handleSelectCountryOnChange}
			onInputChange={(_e, value) => onCountryNameChange(value)}
		/>
	);
};
