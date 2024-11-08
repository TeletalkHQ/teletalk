import { Box, Typography } from "@repo/ui";

export const Title = () => {
	return (
		<>
			<Box.Flex ai="center" jc="space-between">
				<Box.Div>
					<Typography fontWeight="bold">New Contact</Typography>
				</Box.Div>
				<Box.Div></Box.Div>
			</Box.Flex>
		</>
	);
};
