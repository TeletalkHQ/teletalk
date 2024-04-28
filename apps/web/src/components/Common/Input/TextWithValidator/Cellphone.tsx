import { BaseComponent } from "~/components/Base";
import { CommonOnChange } from "~/types";

import CountrySelector from "../Select/CountrySelector";
import CountryCode from "./CountryCode";
import PhoneNumber from "./PhoneNumber";

interface Props {
	countryCode: string;
	countryName: string;
	phoneNumber: string;
	onChange: CommonOnChange;
}

const Cellphone: React.FC<Props> = ({
	countryCode,
	countryName,
	onChange,
	phoneNumber,
}) => {
	return (
		<>
			<CountrySelector countryCode={countryCode} countryName={countryName} />

			<BaseComponent.Box.Flex jc="space-between" style={{ width: "100%" }}>
				<CountryCode value={countryCode} onChange={onChange} />
				<PhoneNumber value={phoneNumber} onChange={onChange} />
			</BaseComponent.Box.Flex>
		</>
	);
};

export default Cellphone;
