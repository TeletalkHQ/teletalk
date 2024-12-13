import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Typography } from "@repo/ui/typography/typography";

export const Title = () => {
	return (
		<Flex ai="center" jc="space-between">
			<Div>
				<Typography fontWeight="bold">New Contact</Typography>
			</Div>
			<Div></Div>
		</Flex>
	);
};
