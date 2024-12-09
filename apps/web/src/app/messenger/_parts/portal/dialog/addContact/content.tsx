import { type Control } from "@repo/hooks/useForm";
import { type FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { CountryCode } from "@repo/ui/input/countryCode";
import { CountryName } from "@repo/ui/input/countryName";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";
import { PhoneNumber } from "@repo/ui/input/phoneNumber";

interface Props {
	control: Control<FormSchema["addContact"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
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
	);
};
