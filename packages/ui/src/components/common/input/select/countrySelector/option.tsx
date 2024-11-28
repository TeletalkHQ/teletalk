import { ListItemProps } from "@mui/material";
import { BaseSchema } from "@repo/schema";

import { Div, Img, ListItem, Span } from "../../../../base";

interface Props {
	option: BaseSchema.CountriesItem;
	props: ListItemProps;
}

export const Option: React.FC<Props> = ({ option, props }) => {
	return (
		<Div
			style={{
				padding: "0px 8px",
			}}
		>
			<ListItem
				{...props}
				style={{
					...props.style,
					borderRadius: "25px",
				}}
			>
				<Div
					style={{
						width: "90%",
					}}
				>
					<Span
						style={{
							marginRight: "5px",
						}}
					>
						<Img
							alt={`${option.countryName}`}
							height={20}
							loading="lazy"
							src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
							width={20}
						/>
					</Span>
					{option.countryName}
				</Div>

				<Div
					style={{
						width: "10%",
					}}
				>
					+{option.countryCode}
				</Div>
			</ListItem>
		</Div>
	);
};
