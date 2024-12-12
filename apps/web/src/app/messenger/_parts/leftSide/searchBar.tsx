import { Div } from "@repo/ui/box/div";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { InputAdornment } from "@repo/ui/input/inputAdornment";
import { TextField } from "@repo/ui/input/textField";
import { CiSearch } from "react-icons/ci";

interface Props {}

export const SearchBar: React.FC<Props> = () => {
	return (
		<Div className="flex w-full height-14 rounded-lg justify-between items-center p-2">
			<TextField
				fullWidth
				name="search"
				placeholder="Search"
				size="small"
				slotProps={{
					input: {
						className: "rounded-lg",
						startAdornment: (
							<InputAdornment position="start">
								<DynamicIcon icon={CiSearch} />
							</InputAdornment>
						),
					},
				}}
			/>
		</Div>
	);
};
