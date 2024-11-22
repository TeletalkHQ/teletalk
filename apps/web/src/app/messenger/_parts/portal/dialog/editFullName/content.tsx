import { Control } from "@repo/hooks";
import { Box, FirstName } from "@repo/ui";

interface Props {
	control: Control<"updateFullName">;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Box.Flex col>
			<FirstName control={control} />
			<FirstName control={control} />
		</Box.Flex>
	);
};
