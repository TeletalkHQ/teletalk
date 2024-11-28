import { Control } from "@repo/hooks";
import { Box, FieldWithController, Typography } from "@repo/ui";

interface Props {
	control: Control<"updateBio">;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Box.Flex
			col
			style={{
				maxWidth: 400,
			}}
		>
			<FieldWithController control={control} name="bio" />

			<Typography variant="caption">
				any details such as age, occupation or city. Example: 23 y.o. designer
				from San Francisco
			</Typography>
		</Box.Flex>
	);
};
