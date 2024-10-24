import { AutocompleteRenderInputParams } from "@mui/material";

import { Field } from "../../../../base";

interface Props extends AutocompleteRenderInputParams {}

export const SelectorInput: React.FC<Props> = (props) => {
	return (
		<Field
			autoComplete="off"
			name="countryName"
			placeholder="Choose a country"
			required
			{...props}
		/>
	);
};
