import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export function AuthLayout({ children }: Props) {
	// useFCMClient();

	return <>{children}</>;
}
