import { DividerProps, Divider as MainDivider, useTheme } from "@mui/material";

interface Props extends DividerProps {
	label?: string;
}

export const Divider: React.FC<Props> = (props) => {
	const theme = useTheme();

	return (
		<MainDivider
			color={props.color || theme.palette.secondary["800"]}
			orientation="horizontal"
			style={{
				width: "100%",
				...props.style,
			}}
			{...props}
		/>
	);
};
