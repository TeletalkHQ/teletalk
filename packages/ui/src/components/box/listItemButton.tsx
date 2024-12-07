import {
	ListItemButton as MuiListItemButton,
	ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material";

import { Skeleton } from "../loading/skeleton";

export interface ListItemButtonProps extends MuiListItemButtonProps {
	loading?: boolean;
	loadingStyle?: React.CSSProperties;
	fullWidth?: boolean;
	fullHeight?: boolean;
}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
	children,
	fullHeight,
	fullWidth,
	loading,
	loadingStyle,
	style,
	...rest
}) => {
	return (
		<MuiListItemButton
			{...rest}
			style={{
				...style,
				width: fullWidth ? "100%" : style?.width,
				height: fullHeight ? "100%" : style?.height,
			}}
		>
			{loading ? <Skeleton style={loadingStyle} /> : children}
		</MuiListItemButton>
	);
};
