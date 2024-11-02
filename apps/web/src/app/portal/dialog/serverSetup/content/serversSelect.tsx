import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useConfigs } from "@repo/hooks";
import { VoidWithArg } from "@repo/types";
import { Box, Select } from "@repo/ui";
import lodash from "lodash";

interface Props {
	disabled: boolean;
	onServerSelectChange: VoidWithArg<number>;
	selectedServerId: number | undefined;
}

const ServerSelect: React.FC<Props> = ({
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
						if (lodash.isNumber(value)) onServerSelectChange(value);
					}}
				>
					{configs.api.servers.map((item, index) => (
						<Box.MenuItem key={index} value={item.id}>
							{item.url}
						</Box.MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

export default ServerSelect;
