import type { ListProps } from "@mui/material";
import { List as MuiList } from "@mui/material";

interface Props extends ListProps {
	fullWidth?: boolean;
	fullHeight?: boolean;
}

export const List: React.FC<Props> = ({
	fullWidth,
	fullHeight,
	style,
	...rest
}) => {
	return (
		<MuiList
			{...rest}
			style={{
				...style,
				height: fullHeight ? "100%" : style?.height,
				width: fullWidth ? "100%" : style?.width,
			}}
		/>
	);
};
