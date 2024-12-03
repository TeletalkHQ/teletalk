import { Control } from "@repo/hooks";
import { FormSchema } from "@repo/schema";
import { FirstName, Flex } from "@repo/ui";

interface Props {
	control: Control<FormSchema["updateFullName"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Flex col>
			<FirstName control={control} />
			<FirstName control={control} />
		</Flex>
	);
};
