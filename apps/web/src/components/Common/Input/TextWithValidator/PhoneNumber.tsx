import { BaseComponent } from "~/components/Base";
import { OnInputChange } from "~/types";

interface Props {
	onChange: OnInputChange;
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
