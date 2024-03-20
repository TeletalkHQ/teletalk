import { ListItemProps } from "@mui/material";
import type { CountryItem } from "teletalk-type-store";

import { BaseComponent } from "~/components/Base";

interface Props {
  option: CountryItem;
  props: ListItemProps;
}

const Option: React.FC<Props> = ({ option, props }) => (
  <BaseComponent.Box.ListItem {...props}>
    <BaseComponent.Box.Div
      style={{
        width: "90%",
      }}
    >
      <BaseComponent.Box.Span
        style={{
          marginRight: "5px",
        }}
      >
        <BaseComponent.Box.Img
          alt={`${option.countryName}`}
          height={20}
          loading="lazy"
          src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
          width={20}
        />
      </BaseComponent.Box.Span>
      {option.countryName}
    </BaseComponent.Box.Div>

    <BaseComponent.Box.Div
      style={{
        width: "10%",
      }}
    >
      +{option.countryCode}
    </BaseComponent.Box.Div>
  </BaseComponent.Box.ListItem>
);

export default Option;
