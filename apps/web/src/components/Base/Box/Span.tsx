import { ComponentProps } from "react";

const Span: React.FC<ComponentProps<"span">> = (props) => {
	return <span {...props} />;
};

export default Span;
