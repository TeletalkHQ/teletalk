import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { type LoadingButtonProps as MuiLoadingButtonProps } from "@mui/lab";
import { type CSSProperties } from "react";

import { Span } from "../box/span";
import { CircularProgress } from "../loading/circular";

export interface LoadingButtonProps extends MuiLoadingButtonProps {
	loadingIndicatorText?: string;
	width?: number | CSSProperties["width"];
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
	fullWidth = true,
	loadingIndicatorText = "",
	size,
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
					<CircularProgress
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
