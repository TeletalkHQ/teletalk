import { LoadingButton, LoadingButtonProps } from "./loading";

export const Button: React.FC<LoadingButtonProps> = ({
	fullWidth = true,
	size = "large",
	style,
	// TODO: Remove default props - move them to theme
	variant = "contained",
	...rest
}) => {
	return (
		<LoadingButton
			{...rest}
			fullWidth={fullWidth}
			size={size}
			style={style}
			variant={variant}
		/>
	);
};
