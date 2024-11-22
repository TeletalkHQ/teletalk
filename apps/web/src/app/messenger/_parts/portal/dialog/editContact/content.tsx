import { Control } from "@repo/hooks";
import { Box, FirstName, LastName } from "@repo/ui";

interface Props {
	control: Control<"updateContact">;
}
export const Content: React.FC<Props> = ({ control }) => {
	return (
		<>
			<Box.Div>
				<Box.Flex col jc="space-between" mt={2}>
					<FirstName control={control} />
					<LastName control={control} />
				</Box.Flex>
			</Box.Div>
		</>
	);
};
