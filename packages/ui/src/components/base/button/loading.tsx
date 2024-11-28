import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { LoadingButtonProps as MuiLoadingButtonProps } from "@mui/lab";
import { CSSProperties } from "react";

import { Span } from "../box";
import { Progress } from "../progress";

export interface LoadingButtonProps extends MuiLoadingButtonProps {
	loadingIndicatorText?: string;
	width?: number | CSSProperties["width"];
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
	fullWidth = true,
	loadingIndicatorText = "",
	size = "small",
	style,
	width,
	variant = "contained",
	...rest
}) => {
	return (
		<MuiLoadingButton
			{...rest}
			fullWidth={fullWidth}
			loadingIndicator={
				<>
					<Span>{loadingIndicatorText}</Span>
					<Progress.Circular
						style={{
							marginLeft: 10,
						}}
					/>
				</>
			}
			size={size}
			style={{
				...style,
				width,
			}}
			variant={variant}
		/>
	);
};
