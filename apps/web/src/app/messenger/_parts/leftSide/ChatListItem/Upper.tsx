import { BaseSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	firstName: BaseSchema.FirstName;
	lastName: BaseSchema.LastName;
}

export const Upper: React.FC<Props> = ({ firstName, lastName }) => (
	<Flex
		ai="center"
		jc="space-between"
		style={{
			width: "100%",
		}}
	>
		<Typography fontWeight="bold">{`${firstName} ${lastName}`}</Typography>
		<Div>
			<Typography
				style={{
					fontSize: 12,
				}}
				variant="caption"
			>
				12:38
			</Typography>
		</Div>
	</Flex>
);
