import {
	type TableBodyTypeMap,
	type TableCellProps,
	type TableContainerProps,
	type TableHeadProps,
	type TableProps,
	type TableRowProps,
} from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type TableData<Schema> = Array<Schema>;
export type AdvHeader = Array<string>;
export type TRowProps = TableRowProps;
export type TBodyProps = OverridableComponent<
	TableBodyTypeMap<object, "tbody">
>;
export type THeadProps = TableHeadProps;
export type TContainerProps = TableContainerProps;
export type TBaseProps = TableProps;
export type TCellProps = TableCellProps;

export type Order = "asc" | "desc";
export type OnTRowClick<Schema> = (item: Schema) => void;
