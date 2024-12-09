import type { ComponentProps } from "react";

export const Li: React.FC<ComponentProps<"li">> = (props) => {
	return <li {...props} />;
};
