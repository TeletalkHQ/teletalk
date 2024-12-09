import { type Control } from "@repo/hooks/useForm";
import { type FormSchema } from "@repo/schema";
import { Flex } from "@repo/ui/box/flex";
import { FieldWithController } from "@repo/ui/input/fieldWithController";
import { Typography } from "@repo/ui/typography/typography";

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
