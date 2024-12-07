import {
	CircularProgressProps,
	CircularProgress as MuiCircularProgress,
} from "@mui/material";

export const CircularProgress: React.FC<CircularProgressProps> = ({
	size = 20,
	color = "info",
	style,
	...rest
}) => {
	return (
		<MuiCircularProgress
			style={{
				width: "20px",
				height: "20px",
				...style,
			}}
			{...rest}
			color={color}
			size={size}
		/>
	);
};
