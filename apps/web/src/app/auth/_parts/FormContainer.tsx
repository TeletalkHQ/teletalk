import { Flex } from "@repo/ui/box/flex";
import type { PropsWithChildren } from "react";

export const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Flex col gap="8px" width="320px">
			{children}
		</Flex>
	);
};
