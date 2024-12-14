import type { Control } from "@repo/hooks/useForm";
import type { FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { CountryCode } from "@repo/ui/input/countryCode";
import type {
	OnCountryNameChange,
	OnCountrySelectChange,
} from "@repo/ui/input/countrySelector";
import { CountrySelector } from "@repo/ui/input/countrySelector";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";
import { PhoneNumber } from "@repo/ui/input/phoneNumber";
import { useWatch } from "react-hook-form";
import { BsTelephone } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";

interface Props {
	control: Control<FormSchema["addContactByPhone"]>;
	onCountryNameChange: OnCountryNameChange;
	onCountrySelectChange: OnCountrySelectChange;
}

export const Content: React.FC<Props> = ({
	control,
	onCountryNameChange,
	onCountrySelectChange,
}) => {
	const { countryCode, countryName } = useWatch({
		control,
	});

	return (
		<Div className="flex flex-col gap-2">
			<Div className="flex flex-row justify-between gap-2">
				<DynamicIcon icon={RxPerson} />

				<Div className="flex flex-col gap-2 w-full">
					<FirstName control={control} fullWidth />
					<LastName control={control} fullWidth />
				</Div>
			</Div>

			<Div className="flex flex-row justify-between gap-2 w-full">
				<DynamicIcon icon={BsTelephone} />

				<Div className="flex flex-col gap-2 w-full">
					<Div className="flex flex-row gap-2 w-full justify-between items-center">
						<CountryCode control={control} />
						<CountrySelector
							countryCode={countryCode || ""}
							countryName={countryName || ""}
							onCountryNameChange={onCountryNameChange}
							onSelectChange={onCountrySelectChange}
						/>
					</Div>
					<PhoneNumber control={control} />
				</Div>
			</Div>
		</Div>
	);
};
