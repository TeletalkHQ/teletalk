import { DivProps } from "../../../types";

interface Props extends DivProps {
	fullWidth?: boolean;
	fullHeight?: boolean;
}

//  FIXME: User forwardRef
export const Div: React.FC<Props> = ({
	fullHeight,
	fullWidth,
	style,
	...rest
}) => {
	return (
		<div
			{...rest}
			style={{
				...style,
				height: fullHeight ? "100%" : style?.height,
				width: fullWidth ? "100%" : style?.width,
			}}
		/>
	);
};
