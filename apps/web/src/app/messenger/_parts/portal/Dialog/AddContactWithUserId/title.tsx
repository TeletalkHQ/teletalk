import { Box, Typography } from "@repo/ui";

export const Title = () => {
	return (
		<>
			<Box.Flex ai="center" jc="space-between">
				<Box.Div>
					<Typography.H5>Add Contact</Typography.H5>
				</Box.Div>
				<Box.Div></Box.Div>
			</Box.Flex>
		</>
	);
};
