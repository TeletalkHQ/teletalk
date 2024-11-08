import { Table as TableBase, TableContainer } from "@mui/material";
import { PaginationStore } from "@repo/store";
import React from "react";

import { TBody } from "./tBody";
import { AdvTHead, GetHeadersType } from "./tHead";
import { CellValueComponents } from "./tRow";
import { TablePagination } from "./tablePagination";
import {
	OnTRowClick,
	Order,
	TBaseProps,
	TBodyProps,
	TContainerProps,
	THeadProps,
	TRowProps,
	TableData,
} from "./types";

// ? ExtraFields is the data which is not going to render in the table
interface Props<Schema, ExtraFields extends string> {
	components?: CellValueComponents<Schema, ExtraFields>;
	data: TableData<Schema>;
	defaultSortKey: keyof Schema;
	hasPagination?: boolean;
	headers: GetHeadersType<Schema, ExtraFields>;
	hiddenTHeads?: Array<keyof Schema | ExtraFields>;
	isLoading?: boolean;
	onTRowClick?: OnTRowClick<Schema>;
	rowSpacing?: string;
	sortOrder?: Order;
	tableName: PaginationStore.TableName;
	tBaseProps?: TBaseProps;
	tBodyProps?: TBodyProps;
	tCellClassnames?: string;
	tContainerProps?: TContainerProps;
	tHeadProps?: THeadProps;
	tRowProps?: TRowProps;
}

export function AdvTable<Schema, ExtraFields extends string = string>({
	components,
	data,
	defaultSortKey,
	hasPagination = false,
	headers,
	hiddenTHeads,
	isLoading,
	onTRowClick,
	rowSpacing,
	sortOrder = "asc",
	tableName,
	tBaseProps,
	tBodyProps,
	tCellClassnames,
	tContainerProps,
	tHeadProps,
	tRowProps,
}: Props<Schema, ExtraFields>) {
	type Key = keyof Schema;

	const [order, setOrder] = React.useState<Order>(sortOrder);
	const [orderBy, setOrderBy] = React.useState<Key>(defaultSortKey);

	const handleRequestSort = (
		_event: React.MouseEvent<unknown>,
		property: Key
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const sortedData = React.useMemo(
		() => data.slice().sort(getComparator(order, orderBy)),
		[order, orderBy, data]
	);

	return (
		<TableContainer
			className="hide-scrollbar"
			{...tContainerProps}
			sx={{
				height: "100%",
				width: "100%",
				position: "relative",
				...tContainerProps?.sx,
			}}
		>
			<TableBase {...tBaseProps} stickyHeader>
				<AdvTHead
					headers={headers}
					hiddenTHeads={hiddenTHeads}
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
					{...tHeadProps}
				/>
				<TBody
					components={components}
					data={sortedData}
					headers={headers}
					isLoading={isLoading}
					rowSpacing={rowSpacing}
					tBody={tBodyProps}
					tCellClassnames={tCellClassnames}
					tRowProps={tRowProps}
					onTRowClick={onTRowClick}
				/>
			</TableBase>
			{hasPagination && <TablePagination tableName={tableName} />}
		</TableContainer>
	);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Schema>(
	order: Order,
	orderBy: keyof Schema
): (a: Schema, b: Schema) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
