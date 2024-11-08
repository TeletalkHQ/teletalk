import { BaseSchema } from "@repo/schema";
import { Box, Typography } from "@repo/ui";

interface Props {
	firstName: BaseSchema.FirstName;
	lastName: BaseSchema.LastName;
}

export const Upper: React.FC<Props> = ({ firstName, lastName }) => (
	<Box.Flex
		ai="center"
		jc="space-between"
		style={{
			width: "100%",
		}}
	>
		<Typography fontWeight="bold">{`${firstName} ${lastName}`}</Typography>
		<Box.Div>
			<Typography
				style={{
					fontSize: 12,
				}}
				variant="greyCaption"
			>
				12:38
			</Typography>
		</Box.Div>
	</Box.Flex>
);
