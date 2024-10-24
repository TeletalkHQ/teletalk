import { ComponentProps } from "react";

const Div: React.FC<ComponentProps<"div">> = (props) => {
	return <div {...props} />;
};

export default Div;
