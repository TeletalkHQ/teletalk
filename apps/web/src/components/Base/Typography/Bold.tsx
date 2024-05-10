import { ComponentProps } from "react";

import { Box } from "../Box";

interface Props extends ComponentProps<"span"> {}

const Bold: React.FC<Props> = ({ style = {}, children, ...rest }) => {
	return (
		<Box.Span
			{...rest}
			style={{
				...style,
				fontWeight: style?.fontWeight || 600,
			}}
		>
			{children}
		</Box.Span>
	);
};

export default Bold;
