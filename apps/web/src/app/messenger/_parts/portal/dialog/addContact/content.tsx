import { Control } from "@repo/hooks";
import {
	CountryCode,
	CountryName,
	Div,
	FirstName,
	Flex,
	LastName,
	PhoneNumber,
} from "@repo/ui";

interface Props {
	control: Control<"addContact">;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<>
			<Div>
				<Div></Div>

				<Flex col jc="space-between" mt={2}>
					<FirstName control={control} />
					<LastName control={control} />
					<CountryCode control={control} />
					<CountryName control={control} />
					<PhoneNumber control={control} />
				</Flex>
			</Div>
		</>
	);
};
