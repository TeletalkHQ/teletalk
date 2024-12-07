import { Select as MuiSelect, SelectProps } from "@mui/material";

export function Select<T = unknown>(props: SelectProps<T>) {
	return <MuiSelect<T> {...props} />;
}
