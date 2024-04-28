import { BaseComponent } from "~/components/Base";
import { CommonOnChange } from "~/types";

interface Props {
	value: string;
	onChange: CommonOnChange;
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
