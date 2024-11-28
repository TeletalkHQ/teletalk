import {
	ListItemAvatar as MuiListItemAvatar,
	ListItemAvatarProps as MuiListItemAvatarProps,
} from "@mui/material";

import { Skeleton } from "../../common/loading";

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
