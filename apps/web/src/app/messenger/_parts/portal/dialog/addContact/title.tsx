import { Div, Flex, Typography } from "@repo/ui";

export const Title = () => {
	return (
		<>
			<Flex ai="center" jc="space-between">
				<Div>
					<Typography fontWeight="bold">New Contact</Typography>
				</Div>
				<Div></Div>
			</Flex>
		</>
	);
};
