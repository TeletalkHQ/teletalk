import { Control } from "@repo/hooks";
import { FirstName, Flex } from "@repo/ui";

interface Props {
	control: Control<"updateFullName">;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Flex col>
			<FirstName control={control} />
			<FirstName control={control} />
		</Flex>
	);
};
