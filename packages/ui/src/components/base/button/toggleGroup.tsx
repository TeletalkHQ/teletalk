import {
	ToggleButtonGroup as MuiToggleButtonGroup,
	ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material";

import { ToggleButton, ToggleButtonProps } from "./toggle";

export interface ToggleButtonGroupProps<T = string>
	extends MuiToggleButtonGroupProps {
	shouldRoundSides?: boolean;
	items: Array<{
		value: T;
		text: string;
		style?: ToggleButtonProps["style"];
	}>;
}

export const ToggleButtonGroup = <T extends string>({
	color = "primary",
	exclusive = true,
	fullWidth = true,
	onChange,
	shouldRoundSides = true,
	size = "small",
	value,
	items,
	...rest
}: ToggleButtonGroupProps<T>) => {
	return (
		<MuiToggleButtonGroup
			{...rest}
			color={color}
			exclusive={exclusive}
			fullWidth={fullWidth}
			size={size}
			value={value}
			onChange={onChange}
		>
			{items.map((item, index) => {
				const borderRadius = shouldRoundSides
					? items.length === 1
						? "20px 20px 20px 20px"
						: index === 0
							? "20px 0px 0px 20px"
							: index === items.length - 1
								? "0px 20px 20px 0px"
								: undefined
					: undefined;

				return (
					<ToggleButton
						key={index}
						style={{
							borderRadius,
							...item.style,
						}}
						value={item.value}
					>
						{item.text}
					</ToggleButton>
				);
			})}
		</MuiToggleButtonGroup>
	);
};
