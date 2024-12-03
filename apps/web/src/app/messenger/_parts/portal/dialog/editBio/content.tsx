import { Control } from "@repo/hooks";
import { FormSchema } from "@repo/schema";
import { FieldWithController, Flex, Typography } from "@repo/ui";

interface Props {
	control: Control<FormSchema["updateBio"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Flex
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
		</Flex>
	);
};
