import { BaseComponent } from "~/components/Base";
import { CommonOnChange } from "~/types";

interface Props {
	value: string;
	onChange: CommonOnChange;
	required?: boolean;
}

const Username: React.FC<Props> = ({ value, onChange }) => {
	return (
		<BaseComponent.Input.Text
			autoFocus
			InputProps={{
				startAdornment: (
					<BaseComponent.Input.Adornment position="start">
						@
					</BaseComponent.Input.Adornment>
				),
			}}
			label="Username"
			name="username"
			value={value}
			onChange={onChange}
		/>
	);
};

export default Username;
