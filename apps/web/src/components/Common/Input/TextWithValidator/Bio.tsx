import { stuffStore } from "~/classes/StuffStore";
import { BaseComponent } from "~/components/Base";
import { CommonOnChange } from "~/types";

interface Props {
	onChange: CommonOnChange;
	value: string;
}

const Bio: React.FC<Props> = ({ onChange, value }) => {
	return (
		<BaseComponent.Input.Text
			InputProps={{
				endAdornment: (
					<BaseComponent.Input.Adornment position="end">
						{stuffStore.models.bio.maxLength - value.length}
					</BaseComponent.Input.Adornment>
				),
			}}
			label="Bio"
			maxRows={3}
			multiline
			name="bio"
			value={value}
			onChange={onChange}
		/>
	);
};

export default Bio;
