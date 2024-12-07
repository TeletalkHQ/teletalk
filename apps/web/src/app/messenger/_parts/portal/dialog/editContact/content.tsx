import { Control } from "@repo/hooks/useForm";
import { FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";

interface Props {
	control: Control<FormSchema["updateContact"]>;
}
export const Content: React.FC<Props> = ({ control }) => {
	return (
		<>
			<Div>
				<Flex col jc="space-between" mt={2}>
					<FirstName control={control} />
					<LastName control={control} />
				</Flex>
			</Div>
		</>
	);
};
