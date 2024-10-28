import { AutocompleteRenderInputParams } from "@mui/material";

import { TextField } from "../../../../base";

interface Props extends AutocompleteRenderInputParams {}

export const SelectorInput: React.FC<Props> = (props) => {
	return (
		<TextField
			autoComplete="off"
			name="countryName"
			placeholder="Choose a country"
			required
			{...props}
		/>
	);
};
