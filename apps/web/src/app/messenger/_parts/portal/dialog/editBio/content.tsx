import { type Control } from "@repo/hooks/useForm";
import { type FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { FieldWithController } from "@repo/ui/input/fieldWithController";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	control: Control<FormSchema["updateBio"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Div className="flex flex-col gap-2">
			<FieldWithController control={control} name="bio" />

			<Typography variant="body2">
				any details such as age, occupation or city. Example: 23 y.o. designer
				from San Francisco
			</Typography>
		</Div>
	);
};
