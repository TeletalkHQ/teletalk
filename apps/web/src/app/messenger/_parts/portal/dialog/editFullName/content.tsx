import { Control } from "@repo/hooks";
import { FormSchema } from "@repo/schema";
import { Flex } from "@repo/ui/box/flex";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";

interface Props {
	control: Control<FormSchema["updateFullName"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Flex col>
			<FirstName control={control} />
			<LastName control={control} />
		</Flex>
	);
};
