import {
	TableBodyTypeMap,
	TableCellProps,
	TableContainerProps,
	TableHeadProps,
	TableProps,
	TableRowProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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
