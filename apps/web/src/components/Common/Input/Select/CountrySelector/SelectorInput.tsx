import { AutocompleteRenderInputParams } from "@mui/material";

import { BaseComponent } from "~/components/Base";

const SelectorInput = (props: AutocompleteRenderInputParams) => {
  const { id, ...rest } = props;

  return (
    <BaseComponent.Input.Text
      {...rest}
      InputProps={{
        ...props.InputProps,
      }}
      label="Choose a country"
      name="countryName"
      required
    />
  );
};

export default SelectorInput;
