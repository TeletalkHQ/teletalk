import { AutocompleteRenderInputParams } from "@mui/material";

import { TextField } from "../../text/textField";

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
