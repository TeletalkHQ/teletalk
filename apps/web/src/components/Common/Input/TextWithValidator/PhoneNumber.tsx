import { BaseComponent } from "~/components/Base";
import { CommonOnChange } from "~/types";

interface Props {
	onChange: CommonOnChange;
	value: unknown;
}

const PhoneNumber: React.FC<Props> = ({ value, onChange }) => {
	return (
		<BaseComponent.Input.Text
			autoComplete="tel-national"
			label="Phone Number"
			name="phoneNumber"
			required
			style={{ marginLeft: "5px" }}
			value={value}
			onChange={onChange}
		/>
	);
};

export default PhoneNumber;
