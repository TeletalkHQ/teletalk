import type {
	ListItemAvatarProps as MuiListItemAvatarProps } from "@mui/material";
import {
	ListItemAvatar as MuiListItemAvatar
} from "@mui/material";

import { Skeleton } from "../loading/skeleton";

export interface ListItemAvatarProps extends MuiListItemAvatarProps {
	loading?: boolean;
	loadingStyle?: React.CSSProperties;
	fullWidth?: boolean;
	fullHeight?: boolean;
}

export const ListItemAvatar: React.FC<ListItemAvatarProps> = ({
	children,
	fullHeight,
	fullWidth,
	loading,
	loadingStyle,
	style,
	...rest
}) => {
	return (
		<MuiListItemAvatar
			{...rest}
			style={{
				...style,
				height: fullHeight ? "100%" : style?.height,
				width: fullWidth ? "100%" : style?.width,
			}}
		>
			{loading ? <Skeleton style={loadingStyle} /> : children}
		</MuiListItemAvatar>
	);
};
