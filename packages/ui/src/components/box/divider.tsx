import type { DividerProps } from "@mui/material";
import { Divider as MainDivider } from "@mui/material";

interface Props extends DividerProps {
	label?: string;
}

export const Divider: React.FC<Props> = (props) => {
	return (
		<MainDivider
			orientation="horizontal"
			style={{
				width: "100%",
				...props.style,
			}}
			{...props}
		/>
	);
};
