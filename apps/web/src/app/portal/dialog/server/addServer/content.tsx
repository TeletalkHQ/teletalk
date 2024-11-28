import { ServerAvailabilityStatusType } from "@repo/hooks";
import {
	Flex,
	FormControl,
	InputLabel,
	MenuItem,
	OnInputChange,
	OnSelectOnChange,
	Select,
	TextField,
} from "@repo/ui";

import { ServerAvailabilityStatus } from "../serverAvailabilityStatus";

interface Props {
	disabled: boolean;
	inputValue: string;
	onChange: OnInputChange;
	onSelectChange: OnSelectOnChange;
	protocol: string;
	status: ServerAvailabilityStatusType;
}

export const Content: React.FC<Props> = ({
	disabled,
	inputValue,
	onChange,
	onSelectChange,
	protocol,
	status,
}) => {
	return (
		<Flex col gap="5px" style={{ maxWidth: "400px" }}>
			<ServerAvailabilityStatus status={status} />

			<Flex ai="center" jc="space-between" width="100%">
				<FormControl fullWidth style={{ width: "25%" }}>
					<InputLabel>Protocol</InputLabel>
					<Select
						defaultValue={protocol}
						disabled={disabled}
						label="Protocol"
						value={protocol}
						onChange={onSelectChange}
					>
						{["http", "https"].map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					disabled={disabled}
					label="Url"
					name="url"
					style={{ width: "73%" }}
					value={inputValue}
					onChange={onChange}
				/>
			</Flex>
		</Flex>
	);
};
