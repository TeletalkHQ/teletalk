import {
	ListItemButtonProps,
	ListItemButton as MuiListItemButton,
} from "@mui/material";

import { Skeleton } from "../../common/loading";

interface Props extends ListItemButtonProps {
	loading?: boolean;
	loadingStyle?: React.CSSProperties;
	fullWidth?: boolean;
	fullHeight?: boolean;
}

export const ListItemButton: React.FC<Props> = ({
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
