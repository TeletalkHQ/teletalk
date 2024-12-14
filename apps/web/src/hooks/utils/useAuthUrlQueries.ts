import { parseAsString, useQueryState } from "nuqs";

export const useAuthUrlQueries = () => {
	const [countryCode, setCountryCode] = useQueryState(
		"countryCode",
		parseAsString.withDefault("").withOptions({ history: "replace" })
	);

	const [countryName, setCountryName] = useQueryState(
		"countryName",
		parseAsString.withDefault("").withOptions({ history: "replace" })
	);

	const [phoneNumber, setPhoneNumber] = useQueryState(
		"phoneNumber",
		parseAsString.withDefault("").withOptions({ history: "replace" })
	);

	return {
		countryCode,
		countryName,
		phoneNumber,
		setCountryCode,
		setCountryName,
		setPhoneNumber,
	};
};
