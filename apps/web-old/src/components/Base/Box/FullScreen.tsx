import { CSSProperties, ComponentProps } from "react";

import Div from "./Div";

interface Props extends ComponentProps<"div"> {
	overrideStyle?: CSSProperties;
}

const FullScreen: React.FC<Props> = ({ overrideStyle = {}, ...rest }) => {
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

export default FullScreen;
