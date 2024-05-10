import { BaseComponent } from "~/components/Base";
import { OnInputChange } from "~/types";

interface Props {
	value: string;
	onChange: OnInputChange;
	required?: boolean;
}

const VerificationCode: React.FC<Props> = ({ value, onChange }) => {
	return (
		<BaseComponent.Input.Text
			autoFocus
			label="Verification Code"
			name="verificationCode"
			required
			value={value}
			onChange={onChange}
		/>
	);
};

export default VerificationCode;
