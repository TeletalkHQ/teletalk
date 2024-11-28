import { Control } from "@repo/hooks";
import { Div, FirstName, Flex, LastName } from "@repo/ui";

interface Props {
	control: Control<"updateContact">;
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
