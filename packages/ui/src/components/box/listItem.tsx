import { ListItemProps, ListItem as MuiListItem } from "@mui/material";

interface Props extends ListItemProps {
	fullWidth?: boolean;
	fullHeight?: boolean;
}

export const ListItem: React.FC<Props> = ({
	fullHeight,
	fullWidth,
	style,
	...rest
}) => {
	return (
		<MuiListItem
			{...rest}
			style={{
				...style,
				width: fullWidth ? "100%" : style?.width,
				height: fullHeight ? "100%" : style?.height,
			}}
		/>
	);
};
