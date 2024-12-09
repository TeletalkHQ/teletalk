import type { SelectProps } from "@mui/material";
import { Select as MuiSelect } from "@mui/material";

export function Select<T = unknown>(props: SelectProps<T>) {
	return <MuiSelect<T> {...props} />;
}
