import { DivProps } from "../../../types";
import { Div } from "./div";

interface Props extends DivProps {
	overrideStyle?: React.CSSProperties;
}

export const FullScreen: React.FC<Props> = ({
	overrideStyle = {},
	...rest
}) => {
	return (
		<Div
			style={{
				...overrideStyle,
				height: "100vh",
				width: "100vw",
			}}
			{...rest}
		/>
	);
};
