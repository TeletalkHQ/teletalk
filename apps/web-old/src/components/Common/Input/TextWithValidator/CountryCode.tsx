import { BaseComponent } from "~/components/Base";
import { OnInputChange } from "~/types";

interface Props {
	value: string;
	onChange: OnInputChange;
}

const CountryCode: React.FC<Props> = ({ value, onChange }) => {
	return (
		<BaseComponent.Input.Text
			autoComplete="off"
			InputProps={{
				startAdornment: (
					<>
						<BaseComponent.Box.Span>+</BaseComponent.Box.Span>
					</>
				),
			}}
			label="Code"
			name="countryCode"
			required
			style={{ width: "90px" }}
			value={value}
			onChange={onChange}
		/>
	);
};

export default CountryCode;
