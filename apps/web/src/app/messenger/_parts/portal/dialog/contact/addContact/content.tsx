import { type Control } from "@repo/hooks/useForm";
import { type FormSchema } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { CountryCode } from "@repo/ui/input/countryCode";
import { CountryName } from "@repo/ui/input/countryName";
import type { SelectedCountry } from "@repo/ui/input/countrySelector";
import { CountrySelector } from "@repo/ui/input/countrySelector";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";
import { PhoneNumber } from "@repo/ui/input/phoneNumber";
import type { UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { BsTelephone } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";

interface Props {
	control: Control<FormSchema["addContact"]>;
	setValue: UseFormSetValue<Control<FormSchema["addContact"]>>;
}

export const Content: React.FC<Props> = ({ control, setValue }) => {
	const { countryCode, countryName } = useWatch({ control });

	const handleCountryNameChange = (value: string) => {
		setValue("countryName", value);
	};

	const handleCountrySelectChange = (value: SelectedCountry) => {
		setValue("countryName", value?.countryName || "");
		setValue("countryCode", value?.countryCode || "");
	};

	return (
		<Div>
			<Div className="flex flex-row justify-between gap-2">
				<DynamicIcon icon={RxPerson} />

				<Div className="flex flex-col gap-2 w-full">
					<FirstName control={control} fullWidth />
					<LastName control={control} fullWidth />
				</Div>
			</Div>

			<Div className="flex flex-row justify-between gap-2"></Div>
			<DynamicIcon icon={BsTelephone} />

			<Div className="flex flex-col gap-2 w-full">
				<CountryCode control={control} />
				<CountrySelector
					countryCode={countryCode || ""}
					countryName={countryName || ""}
					onCountryNameChange={handleCountryNameChange}
					onSelectChange={handleCountrySelectChange}
				/>{" "}
				<CountryName control={control} />
				<PhoneNumber control={control} />{" "}
			</Div>
		</Div>
	);
};
