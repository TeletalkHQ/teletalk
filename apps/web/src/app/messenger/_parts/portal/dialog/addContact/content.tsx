import { Control } from "@repo/hooks";
import {
	Box,
	CountryCode,
	CountryName,
	FirstName,
	LastName,
	PhoneNumber,
} from "@repo/ui";

interface Props {
	control: Control<"addContact">;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<>
			<Box.Div>
				<Box.Div></Box.Div>

				<Box.Flex col jc="space-between" mt={2}>
					<FirstName control={control} />
					<LastName control={control} />
					<CountryCode control={control} />
					<CountryName control={control} />
					<PhoneNumber control={control} />
				</Box.Flex>
			</Box.Div>
		</>
	);
};
