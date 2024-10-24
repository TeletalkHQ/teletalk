import { ButtonProps, Button as MuiButton } from "@mui/material";

export const Button: React.FC<ButtonProps> = ({
	fullWidth = true,
	size = "large",
	style,
	// TODO: Remove default props - move them to theme
	variant = "contained",
	...rest
}) => {
	return (
		<MuiButton
			{...rest}
			fullWidth={fullWidth}
			size={size}
			style={style}
			variant={variant}
		/>
	);
};
