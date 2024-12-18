import { type Control } from "@repo/hooks/useForm";
import { type FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";

interface Props {
	control: Control<FormSchema["updateContact"]>;
}
export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Div className="flex flex-col gap-2 w-full pt-2">
			<FirstName control={control} />
			<LastName control={control} />
		</Div>
	);
};
