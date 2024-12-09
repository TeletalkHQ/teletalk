import { type ServerAvailabilityStatusType } from "@repo/hooks/usePing";
import { Flex } from "@repo/ui/box/flex";
import { FormControl } from "@repo/ui/box/formControl";
import { MenuItem } from "@repo/ui/box/menuItem";
import { InputLabel } from "@repo/ui/input/inputLabel";
import { Select } from "@repo/ui/input/select";
import { TextField } from "@repo/ui/input/textField";
import { type OnInputChange, type OnSelectOnChange } from "@repo/ui/types";

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
