import { useConfigs } from "@repo/hooks/useConfigs";
import { VoidWithArg } from "@repo/types";
import { FormControl } from "@repo/ui/box/formControl";
import { MenuItem } from "@repo/ui/box/menuItem";
import { InputLabel } from "@repo/ui/input/inputLabel";
import { Select } from "@repo/ui/input/select";
import isNumber from "lodash/isNumber";

interface Props {
	disabled: boolean;
	onServerSelectChange: VoidWithArg<number>;
	selectedServerId: number | undefined;
}

export const ServerSelect: React.FC<Props> = ({
	disabled,
	onServerSelectChange,
	selectedServerId,
}) => {
	const { configs } = useConfigs();

	return (
		<>
			<FormControl disabled={disabled} fullWidth>
				<InputLabel id="labelId">Selected server</InputLabel>
				<Select
					defaultValue={selectedServerId}
					fullWidth
					label="Selected server"
					labelId="labelId"
					size="small"
					value={selectedServerId}
					onChange={({ target: { value } }) => {
						// TODO: Replace with `lodash`
						if (isNumber(value)) onServerSelectChange(value);
					}}
				>
					{configs.api.servers.map((item, index) => (
						<MenuItem key={index} value={item.id}>
							{item.url}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};
