import { Paper } from "@repo/ui/box/paper";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { InputAdornment } from "@repo/ui/input/inputAdornment";
import { TextField } from "@repo/ui/input/textField";
import { RiAccountBoxLine } from "react-icons/ri";

interface Props {}

export const SearchBar: React.FC<Props> = () => {
	return (
		<Paper className="flex size-14 justify-between items-center p-2 w-full ">
			<TextField
				fullWidth
				name="search"
				placeholder="Search"
				size="small"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<DynamicIcon icon={RiAccountBoxLine} />
							</InputAdornment>
						),
					},
				}}
			/>
		</Paper>
	);
};
