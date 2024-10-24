import { BaseComponent } from "~/components/Base";
import { OnInputChange } from "~/types";

interface Props {
	value: string;
	onChange: OnInputChange;
	required?: boolean;
}

const LastName: React.FC<Props> = ({ value, onChange, required }) => {
	return (
		<BaseComponent.Input.Text
			id="lastName"
			label="Last Name"
			name="lastName"
			required={required}
			value={value}
			onChange={onChange}
		/>
	);
};

export default LastName;
