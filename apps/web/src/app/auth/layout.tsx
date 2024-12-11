import { Container } from "@repo/ui/box/container";
import { Flex } from "@repo/ui/box/flex";
import type { PropsWithChildren } from "react";

import { Copyright } from "./_parts/Copyright";

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<Container
			style={{
				paddingTop: "80px",
			}}
		>
			<Flex jc="center">
				<Flex ai="center" col fullWidth gap="8px" maxWidth="320px">
					{children}

					<Copyright
						sx={{
							mb: 4,
							mt: 8,
						}}
					/>
				</Flex>
			</Flex>
		</Container>
	);
}
