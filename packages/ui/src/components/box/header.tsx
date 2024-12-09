import { type ComponentPropsWithRef, type FC } from "react";

export const Header: FC<ComponentPropsWithRef<"header">> = ({ ...rest }) => {
	return <header {...rest} />;
};
