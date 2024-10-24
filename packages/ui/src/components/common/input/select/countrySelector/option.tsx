import { ListItemProps } from "@mui/material";
import { BaseSchema } from "@repo/schema";

import { Box } from "../../../../base";

interface Props {
	option: BaseSchema.CountriesItem;
	props: ListItemProps;
}

export const Option: React.FC<Props> = ({ option, props }) => {
	return (
		<Box.Div
			style={{
				padding: "0px 8px",
			}}
		>
			<Box.ListItem
				{...props}
				style={{
					...props.style,
					borderRadius: "25px",
				}}
			>
				<Box.Div
					style={{
						width: "90%",
					}}
				>
					<Box.Span
						style={{
							marginRight: "5px",
						}}
					>
						<Box.Img
							alt={`${option.countryName}`}
							height={20}
							loading="lazy"
							src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
							width={20}
						/>
					</Box.Span>
					{option.countryName}
				</Box.Div>

				<Box.Div
					style={{
						width: "10%",
					}}
				>
					+{option.countryCode}
				</Box.Div>
			</Box.ListItem>
		</Box.Div>
	);
};
