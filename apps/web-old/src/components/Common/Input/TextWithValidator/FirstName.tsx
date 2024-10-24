import { BaseComponent } from "~/components/Base";
import { OnInputChange } from "~/types";

interface Props {
	value: string;
	onChange: OnInputChange;
	required?: boolean;
}

const FirstName: React.FC<Props> = ({ value, onChange, required = true }) => {
	return (
		<BaseComponent.Input.Text
			autoFocus
			id="firstName"
			label="First Name"
			name="firstName"
			required={required}
			value={value}
			onChange={onChange}
		/>
	);
};

export default FirstName;
